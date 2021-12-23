import { VFXProvider, VFXSpan, VFXVideo } from "react-vfx";
import { circuitState } from "../atoms/circuit";
import { noWait, selector, useRecoilValue } from "recoil";
// import { Circle } from "@react-three/drei";
import { useEffect, useState } from "react";

const shaderList = [
  // "uvGradient",
  // "rainbow",
  "glitch",
  "pixelate",
  "rgbGlitch",
  "rgbShift",
  "halftone",
];

const videoFiles = [
  "/assets/ANGULAR.mp4",
  "/assets/CLEANROOM.mp4",
  "/assets/CLEANROOM.mp4",
  "/assets/CUTTT.mp4",
  "/assets/GOBOv2.mp4",
  "/assets/MOONVIRUS.mp4",
  "/assets/XANNN.mp4",
];
// const shaderState =
const shaderSwitcher = (value: number): string => {
  console.log(shaderList[value % shaderList.length]);
  return shaderList[value % shaderList.length];
};

// const shaderState = selector({
//   key: 'shaderState',
//   get: ({get}) => shaderSwitcher(get(circuitState).knob1)
// })

function TestVideo1() {
  // const circuit = useRecoilValue(circuitState);
  // useEffect(() => {
  //   console.log("rerender")
  // }, [circuit])
  // const now = () => {
  //  return  new Date()
  // }

  return (
    <VFXVideo
      src="/assets/CLEANROOM.mp4"
      // shader={shaderSwitcher(circuit.knob1)}
      shader="sinewave"
      autoPlay
      muted
      width={"100%"}
      loop
    />
  );
}
function TestVideo2() {
  // const circuit = useRecoilValue(circuitState);
  // useEffect(() => {
  //   console.log("rerender")
  // }, [circuit])
  // const now = () => {
  //  return  new Date()
  // }

  return (
    <VFXVideo
      src="/assets/CUTTT.mp4"
      shader={"halftone"}
      autoPlay
      muted
      width={"100%"}
      loop
    />
  );
}

function VideoSelector({
  videoName,
  shaderName,
}: {
  videoName: string;
  shaderName: string;
}) {
  return (
    <VFXVideo
      src={videoName}
      shader={shaderName}
      autoPlay
      muted
      width={"100%"}
      loop
    />
  );
}
export function VFXTest() {
  const circuit = useRecoilValue(circuitState);
  // const [shaderName, setShaderName] = useState(shaderSwitcher(1))
  const [video, setVideo] = useState(videoFiles[0]);
  const [shaderState, setShaderState] = useState(shaderList[2]);
  let usedShader = "uvGradient";
  useEffect(() => {
    setVideo(videoFiles[circuit.knob1 & videoFiles.length]);
    setShaderState(shaderList[circuit.knob2 % shaderList.length]);
  }, [circuit.knob1, circuit.knob2]);
  const now = () => {
    return new Date();
  };

  return (
    <VFXProvider>
      <div style={{ filter: "grayscale(100%)" }}>
        {/* <VFXSpan
          style={{ fontSize: "5rem", color: "#4e4" }}
          shader="glitch"
        >
          高専DJ部
        </VFXSpan> */}
        {VideoSelector({
          videoName: video,
          shaderName: shaderState,
        })}
        {/* <VFXVideo
          src="/assets/CLEANROOM.mp4"
          // shader={shaderName}
          shader={now().getSeconds() % 2 === 0 ? "sinewave" : "halftone"}
          autoPlay
          muted
          width={"1000px"}
          loop
        /> */}
        {/* <VFXVideo
          src="/assets/CUTTT.mp4"
          shader={circuit.knob1 > 50 ? "rgbShift" : "halftone"}
          autoPlay
          muted
          width={"1000px"}
          loop
        />
        <VFXVideo
          src="/assets/ANGULAR.mp4"
          shader="sinewave"
          autoPlay
          muted
          width={"1000px"}
          loop
        /> */}
      </div>
    </VFXProvider>
  );
}
