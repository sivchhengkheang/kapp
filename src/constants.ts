export interface Game {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  cover: string;
  thumbnail: string;
  category: string;
  rate: string;
  starRate: string;
}

export const GAMES: Game[] = [
  {
    id: "TypingCode",
    title: "Typing Code",
    subTitle:
      " Typing the programming language instruction code each language.",
    description:
      "The classic typing code game. Type the code word of programing language you would like to learn! Type the code correctly to keep the game going!",
    iframeUrl: "https://typing-code-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    cover: "cover1.png",
    thumbnail: "/game-cover/typing-code.png",
    category: "typing",
    rate: "4.7",
    starRate: "⭐⭐",
  },
  {
    id: "TypingMath",
    title: "Typing Math",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    subTitle: "asdfadfadfadfadfa",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    cover: "cover1.png",
    thumbnail: "/game-cover/typing-math.png",
    category: "typing",
    rate: "3.4",
    starRate: "⭐⭐",
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    subTitle: "asfadfa",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    cover: "cover1.png",

    thumbnail: "/game-cover/dragon-drop.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐",
  },
  {
    id: "RobotObstacle",
    title: "Robot Obstacle",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    subTitle: "",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    cover: "cover1.png",
    thumbnail: "/game-cover/robot-obstacle.png",
    category: "Action",
    rate: "3.4",
    starRate: "⭐⭐",
  },
  {
    id: "MasterMouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    subTitle: "",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    cover: "cover1.png",
    thumbnail: "/game-cover/master-mouse.png",
    category: "mouse",
    rate: "3.4",
    starRate: "⭐⭐",
  },
  {
    id: "LinkNumber",
    title: "Link Number",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    subTitle: "",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "/game-cover/link-number.png",
    cover: "cover1.png",

    category: "puzzle",
    rate: "3.4",
    starRate: "⭐⭐",
  },
];
