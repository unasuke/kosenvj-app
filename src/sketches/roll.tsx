import p5 from "p5";
import Skecth from "react-p5";
import { easeOutExpo, easeInOutExpo, easeInExpo } from "js-easing-functions";

const WIDTH = 80;

const BPM = 150;

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

export function Roll() {
  let font: p5.Font;
  let logo: p5.IMAGE;
  let vid: p5.MediaElement;
  let textlayer: p5.Graphics;
  let bpmTemp: number;
  let angle = 0;
  // const bpm = 120
  let bpm = BPM;
  let oneBeatMillis = (60 / bpm) * 1000;
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const preload = (p: p5) => {
    logo = p.loadImage("assets/kosendj-logo.png");
  };
  const setup = (p: p5, canvas: Element) => {
    console.log("setup in");
    p.createCanvas(innerWidth, innerHeight - 4).parent(canvas);
    console.info("setup");
  };

  const draw = (p: p5) => {
    p.clear();
    p.background(0);
    oneBeatMillis = (60 / bpm) * 1000;
    // bpmTemp++;
    // p.image(logo, 0, 0, 800, 800);

    p.push();
    p.translate(window.innerWidth / 2.0, window.innerHeight / 2); //原点を移動
    p.imageMode(p.CENTER); //アンカーポイントをセンターに
    p.rotate(p.radians(angle));
    p.image(
      logo,
      0,
      0,
      1000 * heartbeat(p.millis() % oneBeatMillis, oneBeatMillis),
      1000 * heartbeat(p.millis() % oneBeatMillis, oneBeatMillis)
    );
    p.pop();
    angle += 0.6;
  };

  return <Skecth preload={preload} setup={setup} draw={draw} />;
}
