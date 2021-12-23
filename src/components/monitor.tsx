import { useRecoilValue } from "recoil";
import { circuitState } from "../atoms/circuit";

export const Monitor = () => {
  const ciruit = useRecoilValue(circuitState);
  return (
    <div style={{ color: "#fff", fontSize: "22px" }}>
      <p>monitor</p>
      <pre>{ciruit.knob1}</pre>
      <pre>{ciruit.knob2}</pre>
      <pre>{ciruit.knob3}</pre>
      <pre>{ciruit.knob4}</pre>
      <pre>{ciruit.knob5}</pre>
      <pre>{ciruit.knob6}</pre>
      <pre>{ciruit.knob7}</pre>
      <pre>{ciruit.knob8}</pre>
    </div>
  );
};
