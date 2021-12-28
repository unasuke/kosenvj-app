import { atom, selector } from "recoil";

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

export const circuitKnob1State = selector<number>({
  key: "circuitKnob1State",
  get: ({ get }) => get(circuitState).knob1,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob1: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});

export const circuitKnob2State = selector<number>({
  key: "circuitKnob2State",
  get: ({ get }) => get(circuitState).knob2,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob2: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});

export const circuitKnob3State = selector<number>({
  key: "circuitKnob3State",
  get: ({ get }) => get(circuitState).knob3,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob3: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
export const circuitKnob4State = selector<number>({
  key: "circuitKnob4State",
  get: ({ get }) => get(circuitState).knob4,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob4: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
export const circuitKnob5State = selector<number>({
  key: "circuitKnob5State",
  get: ({ get }) => get(circuitState).knob5,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob5: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
export const circuitKnob6State = selector<number>({
  key: "circuitKnob6State",
  get: ({ get }) => get(circuitState).knob6,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob6: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
export const circuitKnob7State = selector<number>({
  key: "circuitKnob7State",
  get: ({ get }) => get(circuitState).knob7,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob7: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
export const circuitKnob8State = selector<number>({
  key: "circuitKnob8State",
  get: ({ get }) => get(circuitState).knob8,
  set: ({ get, set }, newValue) => {
    if (typeof newValue === "number") {
      const s = { ...get(circuitState), knob8: newValue };
      localStorage.setItem("circuitState", JSON.stringify(s));
      set({ ...circuitState }, s);
    }
  },
});
