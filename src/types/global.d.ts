// Extend the Window interface to include the `ethereum` property
// injected by MetaMask and other Web3 browser extensions at runtime.
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    selectedAddress?: string | null;
    request?: (...args: unknown[]) => Promise<unknown>;
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
    [key: string]: unknown;
  };
}
