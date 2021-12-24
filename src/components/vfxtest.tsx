import { VFXProvider, VFXSpan, VFXVideo } from "react-vfx";
import { circuitState } from "../atoms/circuit";
import { displayState } from "../atoms/display";
import { noWait, selector, useRecoilState, useRecoilValue } from "recoil";
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
  "/assets/BEEPLE-SETTING_SUN.mp4",
  "/assets/BOKK.mp4",
  "/assets/BOX_BEAT.mp4",
  "/assets/CLEANROOM.mp4",
  "/assets/CUTTT.mp4",
  "/assets/DVDE.mp4",
  "/assets/FIBER_OPTICAL.mp4",
  "/assets/GOBOv2.mp4",
  "/assets/HEXXX.mp4",
  "/assets/MOONVIRUS.mp4",
  "/assets/OKKKK.mp4",
  "/assets/PRAY_STATE.mp4",
  "/assets/STEPS.mp4",
  "/assets/STRT.mp4",
  "/assets/TENDRIL.mp4",
  "/assets/UNPLUG.mp4",
  "/assets/WRMMM.mp4",
  "/assets/XANNN.mp4",
  "/assets/aquahall.mp4",
  "/assets/base_ten.mp4",
  "/assets/breath_ctrl.mp4",
  "/assets/brokchrd.mp4",
  "/assets/building_tubes.mp4",
  "/assets/built.ee.mp4",
  "/assets/crystmounts.mp4",
  "/assets/darknet.mp4",
  "/assets/dirty_ribbon.mp4",
  "/assets/domeshards.mp4",
  "/assets/exhaust.mp4",
  "/assets/glass_ladder.mp4",
  "/assets/glaubox.mp4",
  "/assets/handgun.mp4",
  "/assets/kewbic_flow.mp4",
  "/assets/milkcave.mp4",
  "/assets/moar.mp4",
  "/assets/mocircshii.mov",
  "/assets/octmesh.mp4",
  "/assets/p-crawl.mp4",
  "/assets/pewpy_dollar_sign.mp4",
  "/assets/pink_vynil.mp4",
  "/assets/rebalance.mp4",
  "/assets/splick.mp4",
  "/assets/t-hawk.mp4",
  "/assets/tech.fux.mp4",
  "/assets/warm_neon_birth.mp4",
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

function VideoSelector({
  videoName,
  shaderName,
}: {
  videoName: string;
  shaderName: string;
}) {
  const display = useRecoilValue(displayState);
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
  const [video, setVideo] = useState(videoFiles[0]);
  let usedShader = "uvGradient";
  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("displayStateSelector"));
    setVideo(state.currentVideo);
  }, []);
  useEffect(() => {
    console.log(display);
    window.addEventListener("storage", (e) => {
      console.log(JSON.parse(e.newValue));
      if (e.key === "displayStateSelector") {
        const value = JSON.parse(e.newValue);
        setVideo(value.currentVideo);
      }
    });
  }, [video]);
  const now = () => {
    return new Date();
  };

  return (
    <VFXProvider>
      <div style={{}}>
        {/* <VFXSpan
          style={{ fontSize: "5rem", color: "#4e4" }}
          shader="glitch"
        >
          高専DJ部
        </VFXSpan> */}
        {/* {VideoSelector({
          videoName: display.currentVideo,
          shaderName: shaderState,
        })} */}
        <VideoSelector videoName={video} shaderName={shaderState} />
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
