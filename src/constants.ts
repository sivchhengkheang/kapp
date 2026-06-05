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
  type: any;
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
  type: any;
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
    starRate: "⭐⭐",
    type: [
      {
        text: "Browser Game",
        color:
          "bg-green-100 text-green-800 border-green-800 border border-green-800",
      },
      {
        text: "Play Free",
        color:
          "bg-blue-100 text-blue-800 border-blue-800 border border-blue-800",
      },
      {
        text: "Typing",
        color:
          "bg-purple-100 text-purple-800 border-purple-800 border border-purple-800",
      },
      {
        text: "Developer Tools",
        color:
          "bg-olive-100 text-olive-800 border-olive-800 border border-olive-800",
      },
    ],
  },
  {
    id: "typing-math",
    title: "Typing Math",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    subTitle: "Test your speed and accuracy solving math problems.",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    insider: "game-cover/insider-game/inside-typing-math.png",
    cover: "cover1.png",
    thumbnail: "/game-cover/typing-math.png",
    category: "typing",
    rate: "3.4",
    starRate: "⭐⭐",
    type: [],
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    subTitle: "Control a dragon to catch falling objects and survive.",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    insider: "game-cover/insider-game/inside-dragon-drop.png",
    cover: "/game-cover/cover/dragon-drop-cover.png",

    thumbnail: "/game-cover/dragon-drop.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐",
    type: [],
  },
  {
    id: "robot-obstacle",
    title: "Robot Obstacle",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    subTitle: "Guide a clever robot through challenging puzzle obstacles.",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    insider: "game-cover/insider-game/inside-robot-obstacle.png",
    cover: "/game-cover/cover/robot-obstacle-cover.png",
    thumbnail: "/game-cover/robot-obstacle.png",
    category: "Action",
    rate: "3.4",
    starRate: "⭐⭐",
    type: [],
  },
  {
    id: "master-mouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    subTitle: "Navigate a clever mouse through complex mazes and challenges.",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    insider: "game-cover/insider-game/inside-master-mouse.png",
    cover: "/game-cover/cover/master-mouse-cover.png",
    thumbnail: "/game-cover/master-mouse.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐",
    type: [],
  },
  {
    id: "link-number",
    title: "Link Number",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    subTitle: "Connect numbers strategically through intricate puzzle mazes.",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "/game-cover/link-number.png",
    insider: "game-cover/insider-game/inside-link-number.png",
    cover: "game-cover/cover/link-number-cover.png",

    category: "puzzle",
    rate: "3.4",
    starRate: "⭐⭐",
    type: [],
  },
];
