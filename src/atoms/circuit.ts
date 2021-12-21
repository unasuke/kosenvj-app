import { atom } from "recoil";

type Circuit = {
  knob1: number;
  knob2: number;
  knob3: number;
  knob4: number;
  knob5: number;
  knob6: number;
  knob7: number;
  knob8: number;
};
export const circuitState = atom<Circuit>({
  key: "circitState",
  default: {
    knob1: 0,
    knob2: 0,
    knob3: 0,
    knob4: 0,
    knob5: 0,
    knob6: 0,
    knob7: 0,
    knob8: 0,
  },
});
