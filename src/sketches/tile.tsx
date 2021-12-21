import p5 from "p5";
import Skecth from "react-p5";
import hiraganaSymbols from "@unicode/unicode-14.0.0/Script/Hiragana/symbols.js";
import katakanaSymbols from "@unicode/unicode-14.0.0/Script/Katakana/symbols.js";
import emojiSymbols from "@unicode/unicode-14.0.0/Binary_Property/Emoji/symbols.js";
import kanjiSymbols from "@unicode/unicode-14.0.0/Block/CJK_Unified_Ideographs/symbols.js";
import { easeOutExpo, easeInOutExpo, easeInExpo } from "js-easing-functions";
import { Input, WebMidi } from "webmidi";

const symbols: string[] = [
  ...hiraganaSymbols,
  ...katakanaSymbols,
  // ...emojiSymbols,
  // ...kanjiSymbols,
];
const knob1Number = 80;
const knob2Number = 81;
const knob3Number = 82;
const knob4Number = 83;
const knob5Number = 84;
const knob6Number = 85;
const knob7Number = 86;
const knob8Number = 87;

const WIDTH = 50;
const kokuRandom = () => {
  return (
    (Math.random() +
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random()) /
    5.0
  );
};

const heartbeat = (elapsed: number, duration: number) => {
  if(elapsed / duration <= 0.3) {
    return 1.6 * (elapsed/duration) + 1
  } else {
    // const y = -0.83*(elapsed/duration) + 1.83
    const y = -1.6*(elapsed/duration) + 1.6
    if (y > 1) {
      return y 
    } else {
      return 1
    }
  }

}

class Block {
  x: number;
  y: number;
  width: number;
  p: p5;
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
    p: p5
  ) {
    this.x = x;
    this.y = y;
    this.width = WIDTH;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.p = p;

    if (
      this.x >= innerWidth / 2.0 - this.width * 2.5 &&
      innerWidth / 2.0 + this.width * 2.5 > this.x &&
      this.y >= innerHeight / 2.0 - this.width * 0.5 &&
      innerHeight / 2.0 + this.width * 0.5 > this.y
    ) {
      this.banner = true;
      // console.log("true");
    } else {
      this.banner = false;
    }
    this.reset();
  }
  reset() {
    this.startTime = this.p.millis();
    this.duration = Math.random() * 1000;
    this.text = this.bannerText();
  }
  draw() {
    let aa =
      255 -
      easeOutExpo(this.p.millis() - this.startTime, 0, 255, this.duration);
    if (aa <= 50) {
      // this.startTime = this.p.millis();
      // this.duration = Math.random() * 1000;
      this.reset();
    }
    // console.log(aa);
    let c;
    if (this.banner) {
      c = this.p.color(0, 200, 0, 255);
      // c = this.p.color("#00ff00");
    } else {
      // c = this.p.color("#00ff00");
      c = this.p.color(0, 200, 0, aa);
    }
    this.p.fill(c);
    // this.p.rect(this.x, this.y, this.width, this.width);
    this.p.text(
      // symbols[Math.floor(Math.random() * 90)],
      // symbols[Math.floor(Math.random() * symbols.length)],
      this.text,
      this.x + this.width / 1,
      this.y + this.width / 1
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

    return this.banner ? c : 
     symbols[Math.floor(Math.random() * 90)];
  }
}
export function Tile() {
  let blocks: Block[] = [];
  let font: p5.Font;
  let vid: p5.MediaElement;
  let textlayer: p5.Graphics;
  let bpmTemp: number;
  let circuit: Input|false;
  let knob = {
    knob1: 10,
    knob2: 0,
    knob3: 0,
    knob4: 0,
    knob5: 0,
    knob6: 0,
    knob7: 0,
    knob8: 0,
  }
  // const bpm = 120
  let bpm = knob.knob1
  let oneBeatMillis = (60 / bpm) * 1000
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const preload = (p: p5) => {
    font = p.loadFont("assets/BestTen-DOT.otf");
  };
  const setup = (p: p5, canvas: Element) => {
    console.log("setup in");
    WebMidi.enable().then(() => {
      circuit = WebMidi.getInputByName("Circuit");
      if (circuit === false) {
        console.warn("not found midi device")
      }

        circuit.addListener("midimessage", (e) => {
          switch (e.data[1]) {
            case knob1Number:
              knob.knob1 = e.data[2] + 50
              break;
          }
        })
    })
    p.createCanvas(innerWidth, innerHeight - 4).parent(canvas);
    // textlayer = p.createGraphics(innerWidth, innerHeight - 4);

    // p.noCanvas();
    vid = p.createVideo(["assets/CLEANROOM.mp4"], () => {
      vid.hide();
      // vid.position(0, 0);
      vid.loop();
      vid.volume(0);
      // vid.play();
    });
    p.background(51);
    p.textFont(font);
    // p.frameRate(30);
    // p.textSize(50 * heartbeat(p.millis(), 100000));
    p.textAlign(p.RIGHT, p.BASELINE);
    bpmTemp = p.millis()

    // for (let i = 0; i < 160; i++) {
    //   for (let j = 0; j < 90; j++) {
    //     blocks.push(new Block(i * 10, j * 10, p));
    //   }
    // }
    for (let i = 0; i < innerWidth; i += WIDTH) {
      for (let j = 0; j < innerHeight; j += WIDTH) {
        blocks.push(new Block(i, j, innerWidth, innerHeight, p));
      }
    }
    console.info("setup");
  };

  const draw = (p: p5) => {
    p.clear();
    p.background(0);
    bpm = knob.knob1
    oneBeatMillis = (60 / bpm) * 1000
    // p.image(vid, 0, 0, innerWidth, innerHeight);
    // p.filter(p.BLUR, 1);
    // p.filter(p.GRAY);

    // p.ellipse(p.mouseX, p.mouseY, 80, 80);
    // for (let i = 0; i < innerWidth; i += WIDTH) {
    //   for (let j = 0; j < innerHeight; j += WIDTH) {
    //     blocks.push(new Block(i, j, innerWidth, innerHeight, p));
    //   }
    // }
    bpmTemp++
    p.textSize(50 * heartbeat(p.millis() % oneBeatMillis, oneBeatMillis));
    blocks.forEach((block) => {
      block.draw();
      // console.count("draw");
    });
    // blocks = [];
    // p.noLoop();
    // p.textSize(30);
    // p.fill("#0f0");
    // p.text(p.millis(), 600, 300);
    // p.text(p.deltaTime, 600, 400);
  };

  return <Skecth preload={preload} setup={setup} draw={draw} />;
}
