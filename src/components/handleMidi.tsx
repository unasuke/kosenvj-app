import { useEffect } from "react";
import { Input, WebMidi } from "webmidi";
import { useRecoilState } from "recoil";
import {
  circuitKnob1State,
  circuitKnob2State,
  circuitKnob3State,
  circuitKnob4State,
  circuitKnob5State,
  circuitKnob6State,
  circuitKnob7State,
  circuitKnob8State,
} from "../atoms/circuit";

const knob1Number = 80;
const knob2Number = 81;
const knob3Number = 82;
const knob4Number = 83;
const knob5Number = 84;
const knob6Number = 85;
const knob7Number = 86;
const knob8Number = 87;

export function HandleMidi() {
  // const [circuit, setCircuit] = useRecoilState(circuitState);
  const [knob1, setKnob1] = useRecoilState(circuitKnob1State);
  const [knob2, setKnob2] = useRecoilState(circuitKnob2State);
  const [knob3, setKnob3] = useRecoilState(circuitKnob3State);
  const [knob4, setKnob4] = useRecoilState(circuitKnob4State);
  const [knob5, setKnob5] = useRecoilState(circuitKnob5State);
  const [knob6, setKnob6] = useRecoilState(circuitKnob6State);
  const [knob7, setKnob7] = useRecoilState(circuitKnob7State);
  const [knob8, setKnob8] = useRecoilState(circuitKnob8State);

  let device: Input;

  useEffect(() => {
    WebMidi.enable().then(() => {
      console.log("WebMidi Enabled");
      device = WebMidi.getInputByName("Circuit");
      if (device) {
        device.addListener("midimessage", (event) => {
          // if (Math.random() > 0.3 && event.message.type !== "clock") {
          //   console.log(`handleMidi: ${event.data}`);
          // }
          switch (event.data[1]) {
            case knob1Number:
              setKnob1(event.data[2]);
              break;
            case knob2Number:
              setKnob2(event.data[2]);
              break;
            case knob3Number:
              setKnob3(event.data[2]);
              break;
            case knob4Number:
              setKnob4(event.data[2]);
              break;
            case knob5Number:
              setKnob5(event.data[2]);
              break;
            case knob6Number:
              setKnob6(event.data[2]);
              break;
            case knob7Number:
              setKnob7(event.data[2]);
              break;
            case knob8Number:
              setKnob8(event.data[2]);
              break;
          }
        });
      }
    });
    return () => {
      device?.removeListener("midimessage");
      console.info("midimessage listener removed");
    };
  }, []);

  return (
    <div>
      <p style={{ display: "none" }}>handleMidi</p>
    </div>
  );
}
