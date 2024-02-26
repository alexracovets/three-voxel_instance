import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Instance, Instances, useScroll } from '@react-three/drei';
import { setVoxel } from '../store/reducers/stateModels';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { useFrame } from '@react-three/fiber';
import voxelizeModel from '../store/utils/voxelizeModel';
import gsap from 'gsap';
import * as THREE from 'three'

LoadModels.propTypes = {
    modelURLs: PropTypes.array,
    currentScene: PropTypes.number,
    setCurrentScene: PropTypes.func,
    setScrollOfset: PropTypes.func,
    scrollOfset: PropTypes.number
};

const params = {
    boxRoundness: .04,
    boxSize: .21,
}

const MAX_INSTANCES = 1000;

function MeInstance({ scale, position, color, anim, setIsAnim }) {
    const meshRef = useRef();
    const targetColor = useMemo(() => new THREE.Color(color), [color]);
    // useThree(() => {
    //     console.log([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z] === [position[0], position[1], position[2]])
    // })

    useEffect(() => {
        if (anim && meshRef.current) {
            console.log(false)
            const tl = gsap.timeline({
                onComplete: () => setIsAnim(false),
                onStart: () => setIsAnim(false)
            });
            // tl.to(meshRef.current.position, {
            //     x: (Math.random() - 0.5) * 10,
            //     y: (Math.random() - 0.5) * 10,
            //     z: (Math.random() - 0.5) * 10,
            //     duration: 0.5,
            // });
            tl.to(meshRef.current.scale, {
                x: scale[0],
                y: scale[1],
                z: scale[2],
                duration: 0.5,
            }, "<");
            tl.to(meshRef.current.color, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b,
                duration: 0.5,
            }, "<");
            tl.to(meshRef.current.position, {
                // delay: 0.5,
                x: position[0],
                y: position[1],
                z: position[2],
                duration: 0.5,
            }, "<");
        }
    }, [anim, position, scale, targetColor, setIsAnim]);

    return (
        <Instance
            ref={meshRef}
            scale={scale}
            position={[0, 0, 0]}
            color={'white'} />
    );
}

MeInstance.propTypes = { scale: PropTypes.array, position: PropTypes.array, color: PropTypes.string, anim: PropTypes.bool, setIsAnim: PropTypes.func };

function InstancedVoxels({ voxels }) {
    const [isAnim, setIsAnim] = useState(false);
    const material = useMemo(() => new THREE.MeshStandardMaterial(), []);
    const geometry = useMemo(() => new RoundedBoxGeometry(params.boxSize, params.boxSize, params.boxSize, 2, params.boxRoundness), []);
    useEffect(() => {
        setIsAnim(true)
    }, [voxels])
    return (
        <Instances geometry={geometry} material={material} scale={[2, 2, 2]} position={[0, 2, 0]}>
            {
                [...Array(MAX_INSTANCES)].map((_, i) => (
                    <MeInstance
                        key={i}
                        scale={
                            voxels[i] ?
                                [1, 1, 1] :
                                [0, 0, 0]
                        }
                        position={
                            voxels[i] ?
                                [voxels[i].position.x, voxels[i].position.y, voxels[i].position.z] :
                                [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]
                        }
                        color={
                            voxels[i] ?
                                voxels[i].color :
                                'white'
                        }
                        anim={isAnim}
                        setIsAnim={setIsAnim}
                    />
                ))
            }
        </Instances>
    );
}

InstancedVoxels.propTypes = { voxels: PropTypes.array };

export default function LoadModels({ modelURLs, currentScene, setCurrentScene, setScrollOfset, scrollOfset }) {
    const stateVoxel = useSelector((state) => state.stateModels.voxels);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    const scroll = useScroll();

    useEffect(() => {
        const checkPage = Math.floor(scrollOfset * modelURLs.length);
        checkPage < modelURLs.length && setCurrentScene(checkPage)
    }, [scrollOfset, modelURLs.length, currentScene, setCurrentScene])

    useFrame(() => {
        setScrollOfset(scroll.offset)
    })

    useEffect(() => {
        const isAllModelsLoaded = Object.keys(stateVoxel).length === modelURLs.length;
        isLoaded !== isAllModelsLoaded && setIsLoaded(isAllModelsLoaded);
    }, [stateVoxel, modelURLs, isLoaded]);

    useEffect(() => {
        const loader = new GLTFLoader();
        const loadModelPromises = modelURLs.map((url) =>
            new Promise((resolve, reject) => {
                loader.load(url, resolve, undefined, reject);
            })
        );

        Promise.all(loadModelPromises)
            .then(gltfScenes => {
                gltfScenes.forEach((gltf, modelIdx) => {
                    const voxel = voxelizeModel(gltf.scene);
                    dispatch(setVoxel({ modelIdx, voxel }));
                });
            })
            .catch(error => console.error("Error loading models:", error));

    }, [modelURLs, dispatch]);
    return (
        <>
            {
                isLoaded && <InstancedVoxels voxels={stateVoxel[currentScene]} />
            }
        </>
    )
}


