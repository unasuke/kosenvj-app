import React, { useEffect, useState } from "react";
import { useGamepads } from "react-gamepads";
import { displayState, displayStateSelector } from "../atoms/display";
import { useRecoilState } from "recoil";

const buttonToVideoName = [
  "/assets/kosendj-glitch-unasuke.mp4",
  "/assets/kosendj-logo-flip.mp4",
  "/assets/kosendj-logo-earth-2.mp4",
  "/assets/kosendj-earth-only.mp4",
];

const shaders = ["glitch", "rgbGlitch", "rgbShift", "none"];

export const GamepadHandler = () => {
  const [gamepads, setGamepads] = useState({});
  const [display, setDisplay] = useRecoilState(displayState);
  const [displaySelector, setDisplaySelector] =
    useRecoilState(displayStateSelector);
  useGamepads((gamepads) => setGamepads(gamepads));

  useEffect(() => {
    if (gamepads) {
      if (gamepads[0]?.buttons[0].pressed) {
        setDisplaySelector({ ...display, currentVideo: buttonToVideoName[0] });
      }
      if (gamepads[0]?.buttons[1].pressed) {
        setDisplaySelector({ ...display, currentVideo: buttonToVideoName[1] });
      }
      if (gamepads[0]?.buttons[2].pressed) {
        setDisplaySelector({ ...display, currentVideo: buttonToVideoName[2] });
      }
      if (gamepads[0]?.buttons[3].pressed) {
        setDisplaySelector({ ...display, currentVideo: buttonToVideoName[3] });
      }
      if (gamepads[0]?.buttons[4].pressed) {
        setDisplaySelector({ ...display, currentShader: "none" });
      }
      if (gamepads[0]?.buttons[6].pressed) {
        setDisplaySelector({
          ...display,
          currentShader: shaders[Math.floor(Math.random() * shaders.length)],
        });
      }
      if (gamepads[0]?.buttons[7].pressed) {
        const randomVideos: string[] = display.videoList?.filter(
          (v) => !v.includes("kosendj")
        );
        setDisplaySelector({
          ...display,
          currentVideo:
            randomVideos[Math.floor(Math.random() * randomVideos.length)],
        });
      }
    }
  });

  return <div></div>;
};
