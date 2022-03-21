import hiraganaSymbols from "@unicode/unicode-14.0.0/Script/Hiragana/symbols.js";
import katakanaSymbols from "@unicode/unicode-14.0.0/Script/Katakana/symbols.js";
import emojiSymbols from "@unicode/unicode-14.0.0/Binary_Property/Emoji/symbols.js";
import kanjiSymbols from "@unicode/unicode-14.0.0/Block/CJK_Unified_Ideographs/symbols.js";
import { easeOutExpo, easeInOutExpo, easeInExpo } from "js-easing-functions";
import { Circuit } from "../atoms/circuit";
import {
  Stage,
  Sprite,
  useTick,
  useApp,
  Text,
  Container,
} from "@inlet/react-pixi";
import { useState } from "react";
import { TextStyle } from "pixi.js";

const WIDTH = 80;
const symbols: string[] = [
  ...hiraganaSymbols,
  ...katakanaSymbols,
  // ...emojiSymbols,
  // ...kanjiSymbols,
];

const bpm = 160;
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

class Block {
  x: number;
  y: number;
  width: number;
  banner: boolean;
  innerWidth: number;
  innerHeight: number;
  text: string;
  startTime: number;
  duration: number;
  constructor(
    x: number,
    y: number,
    innerWidth: number,
    innerHeight: number,
    mill: number
  ) {
    this.x = x;
    this.y = y;
    this.width = WIDTH;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.startTime = mill;

    if (
      this.x >= innerWidth / 2.0 - this.width * 2.5 &&
      innerWidth / 2.0 + this.width * 2.5 > this.x &&
      this.y >= innerHeight / 2.0 - this.width * 0.5 &&
      innerHeight / 2.0 + this.width * 0.5 > this.y
    ) {
      this.banner = true;
    } else {
      this.banner = false;
    }
    console.log("aaaaaaaaa");
    this.reset(this.startTime);
  }
  reset(mills: number) {
    this.startTime = mills;
    this.duration = Math.random() * 5000;
    this.text = this.bannerText();
  }
  draw(mills: number, size: number) {
    let aa = 1.0 - easeOutExpo(mills - this.startTime, 0, 1, this.duration);
    if (aa <= 0.05) {
      this.reset(mills);
    }
    let c;
    if (this.banner) {
      c = 1;
    } else {
      c = aa;
    }
    return (
      <Text
        text={this.text}
        anchor={0.5}
        x={this.x}
        y={this.y}
        style={
          new TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 50,
            fill: `rgba(0, 255, 0, ${c})`,
          })
        }
      />
    );
  }
  bannerText() {
    let c: string = "";
    if (
      this.x >= this.innerWidth / 2.0 - this.width * 2.5 &&
      this.x <= this.innerWidth / 2.0 - this.width * 1.5
    ) {
      c = "高";
    } else if (
      this.x >= this.innerWidth / 2.0 - this.width * 1.5 &&
      this.x <= this.innerWidth / 2.0 - this.width * 0.5
    ) {
      c = "専";
    } else if (
      this.x >= this.innerWidth / 2.0 - this.width * 0.5 &&
      this.x <= this.innerWidth / 2.0 + this.width * 0.5
    ) {
      c = "Ｄ";
    } else if (
      this.x >= this.innerWidth / 2.0 + this.width * 0.5 &&
      this.x <= this.innerWidth / 2.0 + this.width * 1.5
    ) {
      c = "Ｊ";
    } else if (
      this.x >= this.innerWidth / 2.0 + this.width * 1.5 &&
      this.x <= this.innerWidth / 2.0 + this.width * 2.5
    ) {
      c = "部";
    }
    if (Math.random() < 0.1) {
      c = symbols[Math.floor(Math.random() * 90)];
    }

    return this.banner ? c : symbols[Math.floor(Math.random() * 90)];
  }
}

type RotateLogoProps = {
  parentWidth: number;
  parentHeight: number;
};
const blocks = [];
const body = document.getElementsByTagName("body")[0];
for (let i = 0; i < body.clientWidth; i += WIDTH) {
  for (let j = 0; j < body.clientHeight; j += WIDTH) {
    blocks.push(new Block(i, j, body.clientWidth, body.clientHeight, 0));
  }
}
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
  return <Container>{blocks.map((b) => b.draw(mill, size))}</Container>;
};

export const PixiTile = () => {
  const body = document.getElementsByTagName("body")[0];
  return (
    <Stage
      width={body.clientWidth}
      height={body.clientHeight}
      options={{
        resizeTo: body,
        // backgroundAlpha: 0,
      }}
    >
      <RotateLogo
        parentWidth={body.clientWidth}
        parentHeight={body.clientHeight}
      />
    </Stage>
  );
};
