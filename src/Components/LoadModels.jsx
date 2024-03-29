import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setVoxel } from '../store/reducers/stateModels';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import voxelizeModel from '../store/utils/voxelizeModel';
import InstancedVoxels from './InstancedVoxels/InstancedVoxels';

LoadModels.propTypes = {
    modelURLs: PropTypes.array,
    currentScene: PropTypes.number,
    setCurrentScene: PropTypes.func,
    setScrollOfset: PropTypes.func,
    scrollOfset: PropTypes.number
};

export default function LoadModels({ modelURLs, currentScene, setCurrentScene }) {
    const stateVoxel = useSelector((state) => state.stateModels.voxels);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    const scroll = useScroll();

    useFrame((_, delta) => {
        setInterval(() => {
            const checkPage = Math.floor(scroll.offset * modelURLs.length);
            if (checkPage !== currentScene) {
                setCurrentScene(checkPage)
            }
        }, delta)
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


