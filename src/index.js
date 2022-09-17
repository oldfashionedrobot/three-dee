import React from "react";
import { createRoot } from "react-dom/client";

import _ from "lodash";
import { cube } from "./math.js";

function App() {
  console.log(cube(4));
  // console.log(square(4));

  function handleClick(event) {
    import("./print.js").then(({ default: print }) => {
      print("Hello webpack!");
    });
  }

  return (
    <div onClick={(e) => handleClick(e)}>
      {_.join(["Hello", "webpack"], " ")}
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App name="testoo"></App>);
