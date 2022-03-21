import { Route } from "wouter";
import "./App.css";
import { Tile } from "./sketches/tile";
import { Three } from "./three";
import { Midi } from "./midi";
import { HandleMidi } from "./components/handleMidi";
import { RecoilRoot } from "recoil";
import { VFXTest } from "./components/vfxtest";
import { Monitor } from "./components/monitor";
import { Roll } from "./sketches/roll";
import { PixiRotateLogo } from "./components/PixiRotateLogo";
import { PixiTextTile } from "./components/PixiTextTile";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <HandleMidi />
        <div id="sketch" />
        <Route path="/kosendj">
          <PixiTextTile />
        </Route>
        <Route path="/rolling">
          <PixiRotateLogo />
        </Route>
        <Route path="/video">
          <Three />
        </Route>
        <Route path="/vfx">
          <VFXTest />
        </Route>
        <Route path="/midi">{/* <Midi /> */}</Route>
        <Route path="/monitor">
          <Monitor />
        </Route>
        <Route path="/pixi">
          {/* <PixiRotateLogo /> */}
          <PixiTextTile />
        </Route>
      </div>
    </RecoilRoot>
  );
}

export default App;
