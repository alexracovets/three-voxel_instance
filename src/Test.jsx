import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function VoxelMesh({ geometry, params }) {
  const meshRef = useRef();
  const [voxels, setVoxels] = useState([]);

  useEffect(() => {
    // Функція для вокселізації мешу
    const voxelizeMesh = (geometry, params) => {
      // Спрощена логіка для демонстрації, потрібна реалізація вокселізації
      return []; // Повертаємо масив позицій для вокселів
    };

    const newVoxels = voxelizeMesh(geometry, params);
    setVoxels(newVoxels);
  }, [geometry, params]);

  return (
    <>
      {voxels.map((voxel, index) => (
        <RoundedBox
          key={index}
          args={[params.boxSize, params.boxSize, params.boxSize]} // Розміри вокселя
          radius={params.boxRoundness} // Закругленість
          smoothness={2} // Гладкість
          position={voxel.position} // Позиція вокселя
        >
          <meshLambertMaterial attach="material" color={0xeeee22} />
        </RoundedBox>
      ))}
    </>
  );
}

function Test() {
  const params = {
    gridSize: 0.3,
    boxSize: 0.2,
    boxRoundness: 0.03,
    // Додаткові параметри можна додати тут
  };

  const geometries = {
    "torus knot": new THREE.TorusKnotGeometry(2, .6, 50, 10),
    // Інші геометрії
  };

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <OrbitControls />
      <VoxelMesh geometry={geometries["torus knot"]} params={params} />
    </Canvas>
  );
}

export default Test;
