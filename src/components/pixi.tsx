import hiraganaSymbols from "@unicode/unicode-14.0.0/Script/Hiragana/symbols.js";
import katakanaSymbols from "@unicode/unicode-14.0.0/Script/Katakana/symbols.js";
import emojiSymbols from "@unicode/unicode-14.0.0/Binary_Property/Emoji/symbols.js";
import kanjiSymbols from "@unicode/unicode-14.0.0/Block/CJK_Unified_Ideographs/symbols.js";
import { easeOutExpo, easeInOutExpo, easeInExpo } from "js-easing-functions";
import { Circuit } from "../atoms/circuit";
import { Stage, Sprite, useTick, useApp } from "@inlet/react-pixi";
import { useState } from "react";

const bpm = 120;
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
};
const RotateLogo = ({ parentWidth, parentHeight }: RotateLogoProps) => {
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

export const Pixi = () => {
  const body = document.getElementsByTagName("body")[0];
  return (
    <Stage
      width={body.clientWidth}
      height={body.clientHeight}
      options={{ resizeTo: body, backgroundAlpha: 0 }}
    >
      <RotateLogo
        parentWidth={body.clientWidth}
        parentHeight={body.clientHeight}
      />
    </Stage>
  );
};
