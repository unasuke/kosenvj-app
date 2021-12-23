import { Route } from "wouter";
import "./App.css";
import { Tile } from "./sketches/tile";
import { Three } from "./three";
import { Midi } from "./midi";
import { HandleMidi } from "./components/handleMidi";
import { RecoilRoot } from "recoil";
import {VFXTest} from "./components/vfxtest"

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <HandleMidi />
        <div id="sketch" />
        <Route path="/kosendj">
          <Tile />
        </Route>
        <Route path="/video">
          <Three />
        </Route>
        <Route path="/vfx" >
          <VFXTest />
        </Route>
        <Route path="/midi">{/* <Midi /> */}</Route>
      </div>
    </RecoilRoot>
  );
}

export default App;
