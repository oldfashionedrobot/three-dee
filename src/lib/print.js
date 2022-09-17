import { cube, square } from "./math.js";

export default function print(text) {
  console.log(text);
  console.log(cube(2));
}

export function plums() {
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");
  console.log("plums");

  for (let i = 0; i < 10; i++) {
    console.log("plums");
    console.log("plums");
    console.log("plums");
    console.log("plums");
    console.log("plums");
    console.log("plums");
  }
}
