import { VFXProvider, VFXSpan, VFXVideo } from "react-vfx";
import { circuitState } from "../atoms/circuit";
import { displayState } from "../atoms/display";
import { noWait, selector, useRecoilState, useRecoilValue } from "recoil";
// import { Circle } from "@react-three/drei";
import { useEffect, useState } from "react";
import { StyledStepper } from "@chakra-ui/react";

const shaderList = [
  // "uvGradient",
  // "rainbow",
  "glitch",
  "pixelate",
  "rgbGlitch",
  "rgbShift",
  "halftone",
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
  const videoComponent =
    shaderName === "none" ? (
      <video src={videoName} autoPlay muted width={"100%"} loop />
    ) : (
      <VFXVideo
        src={videoName}
        shader={shaderName}
        autoPlay
        muted
        width={"100%"}
        loop
      />
    );
  return videoComponent;
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
    state.videoList.map((list) => {
      console.log(list);
      fetch(list).then((res) => {
        return null;
      });
    });
    setVideo(state.currentVideo);
    setShader(state.currentShader);
  }, []);

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [video, shader]);

  useEffect(() => {}, []);

  return (
    <VFXProvider>
      <div style={{ overflow: "hidden" }}>
        <VideoSelector videoName={video} shaderName={shader} />
      </div>
    </VFXProvider>
  );
}
