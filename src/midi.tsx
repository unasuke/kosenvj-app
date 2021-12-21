import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

type Circit = {
  knob1: number;
  knob2: number;
  knob3: number;
  knob4: number;
  knob5: number;
  knob6: number;
  knob7: number;
  knob8: number;
};
const knob1Number = 80;
const knob2Number = 81;
const knob3Number = 82;
const knob4Number = 83;
const knob5Number = 84;
const knob6Number = 85;
const knob7Number = 86;
const knob8Number = 87;

export function Midi() {
  const [circuit, setCircuit] = useState<Circit>({
    knob1: 0,
    knob2: 0,
    knob3: 0,
    knob4: 0,
    knob5: 0,
    knob6: 0,
    knob7: 0,
    knob8: 0,
  });

  useEffect(() => {
    WebMidi.enable().then(() => {
      console.log("Enabled");
      console.dir(WebMidi.getInputByName("Circuit"));
      const circuitDevice = WebMidi.getInputByName("Circuit");
      if (circuitDevice !== false) {
        circuitDevice.addListener("midimessage", (e) => {
          if (Math.random() > 0.8 && e.message.type !== "clock") {
            console.dir(e);
          }
          switch (e.data[1]) {
            case knob1Number:
              setCircuit({ ...circuit, knob1: e.data[2] });
              break;
            case knob2Number:
              setCircuit({ ...circuit, knob2: e.data[2] });
              break;
            case knob3Number:
              setCircuit({ ...circuit, knob3: e.data[2] });
              break;
            case knob4Number:
              setCircuit({ ...circuit, knob4: e.data[2] });
              break;
            case knob5Number:
              setCircuit({ ...circuit, knob5: e.data[2] });
              break;
            case knob6Number:
              setCircuit({ ...circuit, knob6: e.data[2] });
              break;
            case knob7Number:
              setCircuit({ ...circuit, knob7: e.data[2] });
              break;
            case knob8Number:
              setCircuit({ ...circuit, knob8: e.data[2] });
              break;
          }
          // console.log("noteon");
          // if (Math.random() > 0.3 && e.message.type !== "clock") {
          //   console.dir(e);
          // }
        });
      }
      // circuit.addListerner("midimessage", (e) => {
      //   console.log(e);
      // });
    });
  }, []);
  return (
    <div style={{backgroundColor: "#fff"}}>
      <p>Midi</p>
      <ul>
        <li>knob1 (80) value: {circuit.knob1}</li>
        <li>knob2 (81) value: {circuit.knob2}</li>
        <li>knob3 (82) value: {circuit.knob3}</li>
        <li>knob4 (83) value: {circuit.knob4}</li>
        <li>knob5 (84) value: {circuit.knob5}</li>
        <li>knob6 (85) value: {circuit.knob6}</li>
        <li>knob7 (86) value: {circuit.knob7}</li>
        <li>knob8 (87) value: {circuit.knob8}</li>
      </ul>
    </div>
  );
}
