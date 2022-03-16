import { useEffect, useRef, useState } from "react";
import "./App.css";
import CursorEffect from "./components/CursorEffect";

const FPS = 60;
const speed = 2;
const [LOGO_WIDTH, LOGO_HEIGHT] = [98, 38];
const COLORS = ["red", "blue", "green", "yellow"];
let [xDirection, yDirection] = [
  Math.random() > 0.5 ? 1 : -1,
  Math.random() > 0.5 ? 1 : -1,
];

const getRandomColor = (exlude) => {
  const newColors = COLORS.filter((color) => color !== exlude);
  const randomIndex = Math.floor(Math.random() * newColors.length);

  return newColors[randomIndex];
};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getInitialPosition = () => {
  const randomOffsetX = getRandomArbitrary(
    window.innerWidth / 4,
    window.innerWidth / 2.5
  );
  const randomOffsetY = getRandomArbitrary(
    window.innerHeight / 4,
    window.innerHeight / 2.5
  );

  return {
    top: window.innerWidth / 2 - LOGO_WIDTH / 2 + randomOffsetX,
    left: window.innerHeight / 2 - LOGO_HEIGHT / 2 + randomOffsetY,
  };
};

export default function App() {
  const [dvdPos, setDvdPos] = useState(getInitialPosition);
  const cornerHits = useRef(0);
  const dvdColor = useRef("blue");

  useEffect(() => {
    setInterval(() => {
      setDvdPos((prevPos) => {
        let top = prevPos.top + yDirection * speed;
        let left = prevPos.left + xDirection * speed;
        let hits = 0;
        const xLimit = window.innerWidth - LOGO_WIDTH;
        const yLimit = window.innerHeight - LOGO_HEIGHT;

        if (top >= yLimit || top <= 0) {
          hits++;
          top = yLimit;
          yDirection *= -1;
          dvdColor.current = getRandomColor(dvdColor.current);
        }
        if (left >= xLimit || left <= 0) {
          hits++;
          left = xLimit;
          xDirection *= -1;
          dvdColor.current = getRandomColor(dvdColor.current);
        }

        if (hits > 1) cornerHits.current += 1;

        return { top, left };
      });
    }, 1000 / FPS);
  }, []);

  return (
    <>
      <CursorEffect
        element={document.querySelector("App")}
        type="ghost"
      ></CursorEffect>
      <div className="App">
        <div className="container"></div>
        <h1
          className="logo"
          style={{
            top: dvdPos.top + "px",
            left: dvdPos.left + "px",
            color: dvdColor.current,
          }}
        >
          🖼️🖼️🖼️
        </h1>
        {/* <svg
        className="logo"
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          top: dvdPos.top + "px",
          left: dvdPos.left + "px",
          fill: dvdColor.current,
        }}
      >
        <path d="M7.4 4.959C3.268 4.959 0 5.509 0 6.186C0 6.864 3.268 7.413 7.4 7.413C11.532 7.413 14.943 6.864 14.943 6.186C14.944 5.508 11.533 4.959 7.4 4.959ZM7.263 6.51C6.306 6.51 5.53 6.273 5.53 5.98C5.53 5.687 6.306 5.45 7.263 5.45C8.22 5.45 8.995 5.687 8.995 5.98C8.995 6.273 8.219 6.51 7.263 6.51ZM13.319 0.052002H9.701L7.769 2.291L6.849 0.0830021H1.145L0.933 1.045H3.202C3.202 1.045 4.239 0.909002 4.273 1.739C4.273 3.177 1.897 3.055 1.897 3.055L2.341 1.555H0.869L0.194 3.988H2.862C2.862 3.988 5.683 3.738 5.683 1.77C5.683 1.77 5.797 1.196 5.749 0.943002L7.124 4.62L10.559 1.055H13.165C13.165 1.055 13.963 1.123 13.963 1.74C13.963 3.178 11.604 3.028 11.604 3.028L11.969 1.556H10.682L9.946 3.989H12.399C12.399 3.989 15.465 3.799 15.465 1.71C15.465 1.709 15.404 0.052002 13.319 0.052002Z" />
      </svg> */}
        {/* <svg
        style={{
          top: dvdPos.top + "px",
          left: dvdPos.left + "px",
          fill: dvdColor.current,
        }}
        viewBox="0 0 750 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f)">
          <circle
            cx="375"
            cy="375"
            r="125"
            fill="url(#paint0_linear)"
            fillOpacity="1"
          />
        </g>
        <defs>
          <filter
            id="filter0_f"
            x="0"
            y="0"
            width="1550"
            height="1550"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur" />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="375"
            y1="200"
            x2="375"
            y2="550"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CB652B" />
            <stop offset="0.41849" stopColor="#E3631B" />
            <stop offset="0.503309" stopColor="#D9A621" />
            <stop offset="0.747164" stopColor="#F31010" />
          </linearGradient>
        </defs>
      </svg> */}
      </div>
    </>
  );
}
