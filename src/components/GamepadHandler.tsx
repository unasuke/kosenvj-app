import React, { useEffect, useState } from "react";
import { useGamepads } from "react-gamepads";
import { displayState, displayStateSelector } from "../atoms/display";
import { useRecoilState } from "recoil";

const buttonToVideoName = [""];
export const GamepadHandler = () => {
  const [gamepads, setGamepads] = useState({});
  const [display, setDisplay] = useRecoilState(displayState);
  const [displaySelector, setDisplaySelector] =
    useRecoilState(displayStateSelector);
  useGamepads((gamepads) => setGamepads(gamepads));

  useEffect(() => {
    if (gamepads) {
      if (gamepads[0]?.buttons[0].pressed) {
        setDisplaySelector({ ...display, currentVideo: display.videoList[0] });
      }
    }
  });

  return <div></div>;
};
