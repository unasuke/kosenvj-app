import { useEffect } from "react";
import { WebMidi } from "webmidi";
import { useRecoilState } from "recoil";
import { circuitState } from "../atoms/circuit";

const knob1Number = 80;
const knob2Number = 81;
const knob3Number = 82;
const knob4Number = 83;
const knob5Number = 84;
const knob6Number = 85;
const knob7Number = 86;
const knob8Number = 87;

export function HandleMidi() {
  const [circuit, setCircuit] = useRecoilState(circuitState);

  useEffect(() => {
    WebMidi.enable().then(() => {
      console.log("WebMidi Enabled");
      const device = WebMidi.getInputByName("Circuit");
      if (device) {
        device.addListener("midimessage", (event) => {
          if (Math.random() > 0.3 && event.message.type !== "clock") {
            console.log(`handleMidi: ${event.data}`);
          }
          switch (event.data[1]) {
            case knob1Number:
              setCircuit({ ...circuit, knob1: event.data[2] });
              break;
            case knob2Number:
              setCircuit({ ...circuit, knob2: event.data[2] });
              break;
            case knob3Number:
              setCircuit({ ...circuit, knob3: event.data[2] });
              break;
            case knob4Number:
              setCircuit({ ...circuit, knob4: event.data[2] });
              break;
            case knob5Number:
              setCircuit({ ...circuit, knob5: event.data[2] });
              break;
            case knob6Number:
              setCircuit({ ...circuit, knob6: event.data[2] });
              break;
            case knob7Number:
              setCircuit({ ...circuit, knob7: event.data[2] });
              break;
            case knob8Number:
              setCircuit({ ...circuit, knob8: event.data[2] });
              break;
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //     setCircuit({...circuit, knob1: 1})
    // }, 5000);
  }, []);

  return (
    <div>
      <p style={{ display: "none" }}>handleMidi</p>
    </div>
  );
}
