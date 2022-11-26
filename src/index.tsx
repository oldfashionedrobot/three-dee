import React from "react";
import { createRoot } from "react-dom/client";

import ThreeDee from "./components/three-dee";

import "./styles.css";

function App({ name }: { name: string }): React.ReactElement {
  return (
    <React.StrictMode>
      <h1>{name}</h1>
      <ThreeDee />
    </React.StrictMode>
  );
}

const container: HTMLElement = document.getElementById("root");
const root = createRoot(container);
root.render(<App name="three-dee-stuff"></App>);
