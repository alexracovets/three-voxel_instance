import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei';
import { useState } from 'react';
import MeScroll from './Scroll';

const modelURLs = [
    'https://ksenia-k.com/models/Chili%20Pepper.glb',
    'https://ksenia-k.com/models/Chicken.glb',
    'https://ksenia-k.com/models/Cherry.glb',
    'https://ksenia-k.com/models/Banana%20Bundle.glb',
    'https://ksenia-k.com/models/Bonsai.glb',
    'https://ksenia-k.com/models/egg.glb'
];

function MeScene() {
    const [currentScene, setCurrentScene] = useState(0);
    return (
        <Canvas>
            <ambientLight intensity={1} />
            <spotLight position={[5, 10, 7]} intensity={50} />
            <PerspectiveCamera makeDefault position={[15, -10, 20]} />
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}  minZoom={4}/>
            <MeScroll models={modelURLs} currentScene={currentScene} setCurrentScene={setCurrentScene} />
            <Plane args={[100, 100]} position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={'gray'} receiveShadow />
            </Plane>
        </Canvas>
    );
}

export default MeScene;
