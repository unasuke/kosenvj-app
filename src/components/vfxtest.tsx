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
  const [video, setVideo] = useState("");
  const [shader, setShader] = useState("");
  const onStorageChange = (event) => {
    // console.log(JSON.parse(event.newValue));
    console.log("onStorageChanges");
    if (event.key === "displayStateSelector") {
      const value = JSON.parse(event.newValue);
      setVideo(value.currentVideo);
      setShader(value.currentShader);
      console.log("called");
    }
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("displayStateSelector"));
    setVideo(state.currentVideo);
    setShader(state.currentShader);
  }, []);

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [video, shader]);
  const now = () => {
    return new Date();
  };

  return (
    <VFXProvider>
      <div style={{ overflow: "hidden" }}>
        <VideoSelector videoName={video} shaderName={shader} />
      </div>
    </VFXProvider>
  );
}
