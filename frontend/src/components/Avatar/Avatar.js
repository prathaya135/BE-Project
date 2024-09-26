import { useState,Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment,OrbitControls } from "@react-three/drei";
import  Scene  from "./Scene.jsx";

function Avatar(){
    const [count,setcount]=useState(0);
    return(
        <>
        <Canvas>
            <ambientLight intensity={2}/>
            <OrbitControls enableZoom={false}/>
            <Suspense fallback={null}>
                <Scene></Scene>
            </Suspense>
            <Environment preset="sunset"></Environment>
        </Canvas>
        </>
    )
}
export default Avatar;



