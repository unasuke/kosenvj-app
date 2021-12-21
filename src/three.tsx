// import * as THREE from "three";
// import ReactDOM from "react-dom";
// import React, { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";

// function Box(props: JSX.IntrinsicElements["mesh"]) {
//   const ref = useRef<THREE.Mesh>(null!);
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

// export function Three() {
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[3.2, 0, 5]} />
//     </Canvas>
//   );
// }

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";

function Scene() {
  const size = useAspect(1920, 1080, 1);
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "./assets/CLEANROOM.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    return vid;
  });
  // Keep in mind videos can only play once the user has interacted with the site ...
  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={size}>
      <planeBufferGeometry />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

export function Three() {
  return (
    <Canvas
      orthographic
      linear
      camera={{ position: [0, 0, 100] }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Scene />
    </Canvas>
  );
}
