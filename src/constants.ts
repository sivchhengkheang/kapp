export interface Game {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  cover: string;
  insider: string;
  thumbnail: string;
  category: string;
  rate: string;
  starRate: string;
  /** Tailwind bg + text classes for the brand accent button, e.g. "bg-blue-600 text-white hover:bg-blue-700" */
  brandColor: string;
  type: any;
  windows: any;
  linux: any;
}
export interface PRODUCT_DATA {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  cover: string;
  insider: string;
  thumbnail: string;
  category: string;
  rate: string;
  starRate: string;
  brandColor: string;
  type: any;
  windows: any;
  linux: any;
}

export const PRODUCT_DATA: Game[] = [
  {
    id: "typing-code",
    title: "Typing Code",
    subTitle: "Master programming syntax and boost your coding speed.",
    description:
      "Level up your developer skills with this fast-paced typing challenge! Choose a programming language, type real code snippets accurately to keep your streak alive, and build the muscle memory needed to code faster.",
    iframeUrl: "https://typing-code-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    cover: "game-cover/cover/typing-code-cover.png",
    insider: "game-cover/insider-game/inside-typing-code.png",
    thumbnail: "game-cover/typing-code.png",
    category: "typing",
    rate: "4.7",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-violet-600 hover:bg-violet-700 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Typing",
        color: "bg-purple-100 text-purple-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "TypingCodeSetup1.1.0.exe",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "210.3 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Typing-Code-Setup 1.1.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "TypingCode1.1.0.AppImage",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "253.2MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Typing Code-1.1.0.AppImage",
      },
    },
  },
  {
    id: "typing-math",
    title: "Typing Math",
    subTitle: "Solve fast — type the answer before time runs out!",
    description:
      "The ultimate typing challenge for math lovers! Calculate the answers quickly and type them flawlessly to survive as long as you can.",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    insider: "game-cover/insider-game/inside-typing-math.png",
    cover: "game-cover/cover/typing-math-cover.png",
    thumbnail: "game-cover/typing-math.png",
    category: "typing",
    rate: "3.4",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-sky-500 hover:bg-sky-600 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-sky-100 text-sky-800",
      },
      {
        text: "Math",
        color: "bg-purple-100 text-purple-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "TypingMathSetup1.1.0.exe",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "110.2 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/TypingMath Setup 1.0.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "TypingMath1.1.0.AppImage",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "139.6 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/TypingMath-1.0.0.AppImage",
      },
    },
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    subTitle:
      "Take flight and test your reflexes in this endless catching challenge.",
    description:
      "Take to the skies in this fast-paced arcade game! Steer your agile dragon to swoop up falling objects and dodge danger. Keep your reaction time sharp to rack up points—how long can you survive before time runs out?",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    insider: "game-cover/insider-game/inside-dragon-drop.png",
    cover: "game-cover/cover/dragon-drop-cover.png",

    thumbnail: "game-cover/dragon-drop.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-orange-500 hover:bg-orange-600 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Drag and Drop",
        color: "bg-orange-100 text-orange-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "DragonDropSetup1.0.0.exe",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "104.9 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Dragon Drop Setup 1.0.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "DragonDrop1.0.0.AppImage",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "125.1 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Dragon Drop Setup 1.0.0.exe",
      },
    },
  },
  {
    id: "robot-obstacle",
    title: "Robot Obstacle",
    subTitle:
      "Outsmart intricate obstacles and guide your clever robot to victory.",
    description:
      "Dive into an immersive adventure where logic is your greatest tool. Navigate your robot through complex, action-packed puzzles. Plan your moves carefully, outmaneuver tricky obstacles, and push your strategic thinking to the limit!",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    insider: "game-cover/insider-game/inside-robot-obstacle.png",
    cover: "game-cover/cover/robot-obstacle-cover.png",
    thumbnail: "game-cover/robot-obstacle.png",
    category: "Action",
    rate: "3.4",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-cyan-600 hover:bg-cyan-700 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Puzzle",
        color: "bg-cyan-100 text-cyan-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "RobotObstacleSetup1.0.0.exe",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "104.9 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Robot-Obstacle-Setup 1.0.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "RobotObstacle1.0.0.AppImage",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "132.1 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/RobotObstacle1.0.0.AppImage",
      },
    },
  },
  {
    id: "master-mouse",
    title: "Master Mouse",
    subTitle:
      "Master your computer controls by guiding a daring mouse through tricky mazes.",
    description:
      "A fun and engaging way to build essential desktop skills! Take control of a clever mouse and weave your way through a series of interactive puzzles. Perfect for testing your reflexes while improving your hand-eye coordination and precision.",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    insider: "game-cover/insider-game/inside-master-mouse.png",
    cover: "game-cover/cover/master-mouse-cover.png",
    thumbnail: "game-cover/master-mouse.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-rose-500 hover:bg-rose-600 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Mouse Control",
        color: "bg-rose-100 text-rose-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "MasterMouseSetup1.1.0.exe",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "83.6 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Master Mouse Setup 1.1.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "MasterMouse1.1.0.AppImage",
      releaseDetails: {
        version: "v1.1.0",
        fileSize: "110.8 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Robot-Obstacle-Setup 1.0.0.exe",
      },
    },
  },
  {
    id: "number-link",
    title: "Number Link",
    subTitle:
      "Master basic computer skills by connecting numbers to solve puzzles.",
    description:
      "An engaging, student-friendly puzzle game designed to build essential mouse control! Guide your cursor to strategically connect numbers, carve a path through intricate mazes, and develop precise hand-eye coordination while solving fun challenges.",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "game-cover/link-number.png",
    insider: "game-cover/insider-game/inside-link-number.png",
    cover: "game-cover/cover/link-number-cover.png",

    category: "puzzle",
    rate: "3.4",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Drawing",
        color: "bg-emerald-100 text-emerald-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "NumberLinkSetup1.0.0.exe",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "214.2 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Number-Link-Setup 1.0.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit", // Fixed copy-paste error
      buttonText: "Download for Linux",
      fileName: "NumberLink1.0.0.AppImage",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "252.1 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/Number Link-1.0.0.AppImage",
      },
    },
  },
  {
    id: "koompi-typing",
    title: "Koompi Typing",
    subTitle:
      "Improve your typing speed and accuracy with real-world keyboard practice.",
    description:
      "An engaging, student-friendly typing game designed to build essential keyboard skills! Practice typing real words and sentences, track your words-per-minute progress, and develop precise finger placement while completing fun and rewarding challenges.",
    iframeUrl: "https://koompi-typing.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "game-cover/koompi-typing.png",
    insider: "game-cover/insider-game/inside-koompi-typing.png",
    cover: "game-cover/cover/koompi-typing-cover.png",

    category: "typing",
    rate: "4.2",
    starRate: "⭐⭐⭐⭐",
    brandColor: "bg-blue-600 hover:bg-blue-700 text-white",
    type: [
      {
        text: "Browser Game",
        color: "bg-green-100 text-green-800",
      },
      {
        text: "Play Free",
        color: "bg-blue-100 text-blue-800",
      },
      {
        text: "Typing",
        color: "bg-purple-100 text-purple-800",
      },
      {
        text: "Developer Tools",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    windows: {
      platform: "Windows",
      osRequirement: "Windows 10/11 - 64-bit",
      buttonText: "Download for Windows",
      fileName: "koompi-typing Setup 1.0.0.exe",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "97.39 MB",
        fileType: ".exe installer",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/koompi-typing Setup 1.0.0.exe",
      },
    },
    linux: {
      platform: "Linux",
      osRequirement: "Modern Linux Distros - 64-bit",
      buttonText: "Download for Linux",
      fileName: "koompi-typing-1.0.0.AppImage",
      releaseDetails: {
        version: "v1.0.0",
        fileSize: "120.17 MB",
        fileType: ".AppImage",
        architecture: "x64",
        releaseDate: "2026-03-17",
        download: "https://storage.koompi.cloud/org_6a2a675fd9ab673dd52326e2/kapp/koompi-typing-1.0.0.AppImage",
      },
    },
  },
];
