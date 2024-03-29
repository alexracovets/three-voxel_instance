import PropTypes from 'prop-types';

import MeInstance from "../MeInstance/MeInstance";

InstanceWrapper.propTypes = {
    isAnim: PropTypes.bool,
    voxel: PropTypes.object,
    setIsAnim: PropTypes.func
};
export default function InstanceWrapper({ isAnim, voxel, setIsAnim }) {

    return (
        <MeInstance
            isVoxel={voxel}
            scale={
                [1, 1, 1]
            }
            position={
                voxel ?
                    [voxel.position.x, voxel.position.y, voxel.position.z] :
                    [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]
            }
            color={
                voxel ?
                    voxel.color :
                    'white'
            }
            anim={isAnim}
            setIsAnim={setIsAnim}
        />
    );
}