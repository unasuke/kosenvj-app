import { Route } from "wouter";
import "./App.css";
import { Tile } from "./sketches/tile";
import { Three } from "./three";
import { Midi } from "./midi";

function App() {
  return (
    <div className="App">
      <div id="sketch" />
      <Route path="/kosendj">
        <Tile />
      </Route>
      <Route path="/video">
        <Three />
      </Route>
      <Route path="/midi">
        <Midi />
      </Route>
    </div>
  );
}

export default App;
