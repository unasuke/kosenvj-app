import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { displayStateSelector } from "../atoms/display";
import { PixiRotateLogo } from "./PixiRotateLogo";
import { PixiTextTile } from "./PixiTextTile";

type SwitcherProps = {
  name: string;
};

const Switcher = ({ name }: SwitcherProps) => {
  let component;
  switch (name) {
    case "tile":
      component = <PixiTextTile />;
      break;
    case "rolling":
      component = <PixiRotateLogo />;
      break;
    default:
      component = <PixiTextTile />;
  }
  return component;
};

export const Front = () => {
  const displayState = useRecoilValue(displayStateSelector);
  const [front, setFront] = useState(displayState?.front || "tile");
  const onStorageChange = (event) => {
    // console.log(JSON.parse(event.newValue));
    console.log("onStorageChanges");
    if (event.key === "displayStateSelector") {
      const value = JSON.parse(event.newValue);
      setFront(value.front);
    }
  };

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("displayStateSelector"));
    setFront(state.front);
  }, []);
  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [front]);

  return <Switcher name={front} />;
};
