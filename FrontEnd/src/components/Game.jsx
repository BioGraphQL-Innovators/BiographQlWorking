import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/FitnessGame.loader.js",
    dataUrl: "build/webgl.data",
    frameworkUrl: "build/build.framework.js",
    codeUrl: "build/build.wasm"
  });

  return (
    <Unity unityProvider={unityProvider} style={{ width: 960, height: 540 }} />
  );
}

export default Game;