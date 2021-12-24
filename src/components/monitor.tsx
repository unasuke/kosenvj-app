import { useRecoilState, useRecoilValue } from "recoil";
import { circuitState } from "../atoms/circuit";
import { displayState, displayStateSelector } from "../atoms/display";

export const Monitor = () => {
  const ciruit = useRecoilValue(circuitState);
  const [display, setDisplay] = useRecoilState(displayState);
  const [displaySelector, setDisplaySelector] =
    useRecoilState(displayStateSelector);
  const onSelectVideo = (v) => {
    console.log(v.target.attributes.src.nodeValue);
    setDisplaySelector({
      ...display,
      currentVideo: v.target.attributes.src.nodeValue,
    });
  };

  return (
    <div style={{ color: "#fff", fontSize: "22px", display: "flex" }}>
      <section>
        <p>monitor</p>
        <pre>{ciruit.knob1}</pre>
        <pre>{ciruit.knob2}</pre>
        <pre>{ciruit.knob3}</pre>
        <pre>{ciruit.knob4}</pre>
        <pre>{ciruit.knob5}</pre>
        <pre>{ciruit.knob6}</pre>
        <pre>{ciruit.knob7}</pre>
        <pre>{ciruit.knob8}</pre>
      </section>
      <section>
        <p>display</p>
        <p>selected: {display.currentVideo}</p>
        <ul>
          {display.videoList.map((v) => {
            return (
              <li key={v}>
                <video muted src={v} width={"300px"} onClick={onSelectVideo} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
