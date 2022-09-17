import _ from "lodash";
// import print from "./print.js";
import { cube } from "./math.js";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  console.log(cube(4));
  // console.log(square(4));

  import("./print.js").then(({ default: print }) => {
    element.onclick = () => print("Hello webpack!");
  });

  return element;
}

document.body.appendChild(component());
