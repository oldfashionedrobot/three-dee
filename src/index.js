import React from "react";
import { createRoot } from "react-dom/client";

import ThreeDee from "./components/three-dee";

import "./styles.css";

function App() {
  return (
    <React.StrictMode>
      <h1>Look at the 3D!</h1>
      <ThreeDee />
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App name="three-dee-stuff"></App>);
