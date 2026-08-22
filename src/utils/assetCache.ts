"use client";

const CACHE_KEY_PREFIX = "kapp_img_cache_v1_";
const CACHE_NAME = "kapp-img-cache-v1";
const CACHE_MANIFEST_KEY = "kapp_img_manifest_v1";

interface CacheManifest {
  version: number;
  keys: string[];
  updatedAt: number;
}

/** Check if localStorage is available */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test_ls__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** Compress image to a lightweight WebP/JPEG DataURL via offscreen Canvas (reduces 2MB PNG to ~20KB string) */
async function compressImageToDataUrl(url: string, maxWidth = 350, quality = 0.7): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG quality 0.7 for tiny footprint (~15-25KB per image)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/** Get a cached image DataURL from localStorage, or return original URL if not found */
export function getCachedImage(url: string): string {
  if (typeof window === "undefined" || !isLocalStorageAvailable()) return url;
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + url);
    return cached ? cached : url;
  } catch {
    return url;
  }
}

/** Preload a list of image URLs using CacheStorage API & Compressed LocalStorage */
export async function preloadAndCacheImages(
  urls: string[],
  onProgress?: (progressPercent: number, statusText: string) => void
): Promise<void> {
  if (typeof window === "undefined") {
    if (onProgress) onProgress(100, "Ready!");
    return;
  }

  const total = urls.length;
  if (total === 0) {
    if (onProgress) onProgress(100, "Ready!");
    return;
  }

  // ── 1. Use Browser Native CacheStorage API (Unlimited Async Storage) ──
  let cacheStorage: Cache | null = null;
  if ("caches" in window) {
    try {
      cacheStorage = await caches.open(CACHE_NAME);
    } catch {
      // Fall back to LocalStorage
    }
  }

  const lsAvailable = isLocalStorageAvailable();
  const cachedKeys: string[] = [];
  let completed = 0;

  // Process all URLs in parallel for ultra-fast performance
  const preloadTasks = urls.map(async (url) => {
    const key = CACHE_KEY_PREFIX + url;

    // 1. CacheStorage API precaching
    if (cacheStorage) {
      try {
        const match = await cacheStorage.match(url);
        if (!match) {
          await cacheStorage.add(url);
        }
      } catch {
        // Ignore cache storage errors
      }
    }

    // 2. Compressed LocalStorage precaching
    if (lsAvailable) {
      const existing = localStorage.getItem(key);
      if (existing) {
        cachedKeys.push(key);
      } else {
        const compressedDataUrl = await compressImageToDataUrl(url);
        if (compressedDataUrl) {
          try {
            localStorage.setItem(key, compressedDataUrl);
            cachedKeys.push(key);
          } catch {
            // LocalStorage full limit safe catch
          }
        }
      }
    }

    completed++;
    const pct = Math.round((completed / total) * 100);
    if (onProgress) {
      const fileName = url.split("/").pop() ?? url;
      onProgress(pct, `Optimizing ${fileName}...`);
    }
  });

  // Fast max 400ms timeout race so page never waits too long
  const timeoutPromise = new Promise((res) => setTimeout(res, 400));
  await Promise.race([Promise.all(preloadTasks), timeoutPromise]);

  // Save manifest metadata
  if (lsAvailable) {
    try {
      const manifest: CacheManifest = {
        version: 1,
        keys: cachedKeys,
        updatedAt: Date.now(),
      };
      localStorage.setItem(CACHE_MANIFEST_KEY, JSON.stringify(manifest));
    } catch {
      // Ignore write errors
    }
  }

  if (onProgress) {
    onProgress(100, "All assets ready!");
  }
}

/** Clear old cache entries */
export function clearImageCache(): void {
  if (typeof window === "undefined") return;
  if (isLocalStorageAvailable()) {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_KEY_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem(CACHE_MANIFEST_KEY);
    } catch {
      // Ignore errors
    }
  }

  if ("caches" in window) {
    caches.delete(CACHE_NAME).catch(() => {});
  }
}
