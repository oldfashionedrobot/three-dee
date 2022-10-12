import React, { useEffect, useRef, useState } from "react";
import { init3d } from "../utils/3d-service";

export default function ThreeDee() {
  const canvasRef = useRef(null);

  useEffect(() => {
    return init3d(canvasRef);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
