import { atom, selector } from "recoil";

type Display = {
  videoList: string[];
  currentVideo: string;
  shaderList: string[];
  currentShader: string;
  bpm: number;
  front: string;
};

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
  "/assets/archimedes.mp4",
  "/assets/atommy.mp4",
  "/assets/base_ten.mp4",
  "/assets/breath_ctrl.mp4",
  "/assets/brokchrd.mp4",
  "/assets/building_tubes.mp4",
  "/assets/built.ee.mp4",
  "/assets/crystmounts.mp4",
  "/assets/cycloid.mp4",
  "/assets/darknet.mp4",
  "/assets/dirty_ribbon.mp4",
  "/assets/domeshards.mp4",
  "/assets/exhaust.mp4",
  "/assets/farkedpattern.mp4",
  "/assets/firegrid.mp4",
  "/assets/fireworks.mp4",
  "/assets/gerschwinn.mp4",
  "/assets/glass_ladder.mp4",
  "/assets/glaubox.mp4",
  "/assets/glytchghost.mp4",
  "/assets/handgun.mp4",
  "/assets/jahara.mp4",
  "/assets/kewbic_flow.mp4",
  "/assets/membrane.mp4",
  "/assets/meta_build.mp4",
  "/assets/milkcave.mp4",
  "/assets/moar.mp4",
  "/assets/mocircshii.mp4",
  "/assets/narrow_gultch.mp4",
  "/assets/octmesh.mp4",
  "/assets/p-crawl.mp4",
  "/assets/pewpy_dollar_sign.mp4",
  "/assets/pink_vynil.mp4",
  "/assets/plugs_slower.mp4",
  "/assets/poley-two.mp4",
  "/assets/rainbee.mp4",
  "/assets/rebalance.mp4",
  "/assets/rolling.mp4",
  "/assets/scream.mp4",
  "/assets/space_crystals.mp4",
  "/assets/splick.mp4",
  "/assets/t-hawk.mp4",
  "/assets/tech.fux.mp4",
  "/assets/tracerfaun.mp4",
  "/assets/triangle_field.mp4",
  "/assets/trianglefield_two.mp4",
  "/assets/tunnal.mp4",
  "/assets/twirlers.mp4",
  "/assets/twisted_hall.mp4",
  "/assets/ubersketch_preview.mp4",
  "/assets/warm_neon_birth.mp4",
  "/assets/worm_parade.mp4",
];

const shaderList = [
  // "uvGradient",
  // "rainbow",
  "glitch",
  "pixelate",
  "rgbGlitch",
  "rgbShift",
  "halftone",
];

export const displayState = atom<Display>({
  key: "displayState",
  default: {
    videoList: videoFiles,
    currentVideo: videoFiles[0],
    shaderList: shaderList,
    currentShader: shaderList[0],
    bpm: 120,
    front: "tile",
  },
});

export const displayStateSelector = selector<Display>({
  key: "displayStateSelector",
  get: ({ get }) => {
    get(displayState);
  },
  set: ({ set }, newValue) => {
    localStorage.setItem("displayStateSelector", JSON.stringify(newValue));
    set(displayState, newValue);
  },
});
