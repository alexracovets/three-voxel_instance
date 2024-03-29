import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Instances } from '@react-three/drei';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from "react";
import { MeshStandardMaterial } from "three";
import InstanceWrapper from "./InstanceWrapper/InstanceWrapper";

InstancedVoxels.propTypes = { voxels: PropTypes.array };

const params = {
    boxRoundness: .04,
    boxSize: .21,
}

const MAX_INSTANCES = 1000;

export default function InstancedVoxels({ voxels }) {
    const [isAnim, setIsAnim] = useState(false);
    const material = useMemo(() => new MeshStandardMaterial(), []);
    const geometry = useMemo(() => new RoundedBoxGeometry(params.boxSize, params.boxSize, params.boxSize, 2, params.boxRoundness), []);

    useEffect(() => {
        setIsAnim(true)
    }, [voxels])

    return (
        <Instances geometry={geometry} material={material} scale={[2, 2, 2]} position={[0, 2, 0]}>
            {
                [...Array(MAX_INSTANCES)].map((_, i) => (
                    <InstanceWrapper key={i} isAnim={isAnim} voxel={voxels[i]} setIsAnim={setIsAnim} />
                ))
            }
        </Instances>
    );
}