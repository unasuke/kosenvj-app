import { easeOutExpo, easeInOutExpo, easeInExpo } from "js-easing-functions";
import { Circuit } from "../atoms/circuit";
import { Stage, Sprite, useTick, useApp } from "@inlet/react-pixi";
import { useState, useEffect } from "react";
import { displayStateSelector } from "../atoms/display";
import { useRecoilValue } from "recoil";

// const bpm = 120;
const heartbeat = (elapsed: number, duration: number) => {
  if (elapsed / duration <= 0.3) {
    return 1.6 * (elapsed / duration) + 1;
  } else {
    // const y = -0.83*(elapsed/duration) + 1.83
    const y = -1.6 * (elapsed / duration) + 1.6;
    if (y > 1) {
      return y;
    } else {
      return 1;
    }
  }
};

type RotateLogoProps = {
  parentWidth: number;
  parentHeight: number;
  bpm: number;
};
const RotateLogo = ({ parentWidth, parentHeight, bpm }: RotateLogoProps) => {
  const app = useApp();
  const oneBeatMillis = (60.0 / bpm) * 1000;
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState(0);
  const [mill, setMill] = useState(0);
  let elapsedMillSec = 0;
  useTick((delta, ticker) => {
    setMill(mill + ticker.elapsedMS);
    setRotation(rotation + 0.01);
    setSize(heartbeat(mill % oneBeatMillis, oneBeatMillis));
  });
  return (
    <Sprite
      image={"/assets/kosendj-logo.png"}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
      anchor={0.5}
      scale={{ x: size * 0.4, y: size * 0.4 }}
      rotation={rotation}
    />
  );
};

export const PixiRotateLogo = () => {
  const body = document.getElementsByTagName("body")[0];
  const display = useRecoilValue(displayStateSelector);
  const [bpm, setBpm] = useState(120);
  const onStorageChange = (event) => {
    // console.log(JSON.parse(event.newValue));
    console.log("onStorageChanges");
    if (event.key === "displayStateSelector") {
      const value = JSON.parse(event.newValue);
      setBpm(value.bpm);
      console.log("called", bpm);
    }
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("displayStateSelector"));
    setBpm(state.bpm);
  }, []);
  useEffect(() => {
    console.log(display);
  }, []);
  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [bpm]);

  return (
    <Stage
      width={body.clientWidth}
      height={body.clientHeight}
      options={{ resizeTo: body, backgroundAlpha: 0 }}
    >
      <RotateLogo
        parentWidth={body.clientWidth}
        parentHeight={body.clientHeight}
        bpm={bpm}
      />
    </Stage>
  );
};
