import { Instance } from '@react-three/drei';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Color } from 'three';

MeInstance.propTypes = {
    scale: PropTypes.array,
    position: PropTypes.array,
    color: PropTypes.string,
    anim: PropTypes.bool,
    setIsAnim: PropTypes.func,
    isVoxel: PropTypes.object
};

export default function MeInstance({ scale, position, color, anim, setIsAnim, isVoxel }) {
    const meshRef = useRef();
    const targetColor = useMemo(() => new Color(color), [color]);
    const [isStatic, setIsStatic] = useState(false);

    useEffect(() => {
        if (anim && meshRef.current) {
            const tl = gsap.timeline({
                ease: "power3.out",
                onStart: () => setIsAnim(false),
                onUpdate: () => setIsStatic(false),
                onComplete: () => {
                    setIsAnim(false);
                    setIsStatic(true);
                },
            });
            tl.to(meshRef.current.position, {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 5,
                z: (Math.random() - 0.5) * 5,
                duration: 0.5,
            });
            tl.to(meshRef.current.scale, {
                x: isVoxel ? scale[0] : 0,
                y: isVoxel ? scale[0] : 0,
                z: isVoxel ? scale[0] : 0,
                duration: 1,
            }, "<");
            tl.to(meshRef.current.color, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b,
                duration: 1,
            }, "<");
            tl.to(meshRef.current.position, {
                delay: 0.5,
                x: position[0],
                y: position[1],
                z: position[2],
                duration: 1,
            }, "<");
        } else if (isStatic) {
            const tl = gsap.timeline({
                ease: "power3.out",
                onStart: () => setIsStatic(false),
                onComplete: () => setIsStatic(true)
            });

            tl.to(meshRef.current.position, {
                x: Math.random() < 0.1 ? position[0] - 0.1 : position[0],
                y: position[1],
                z: position[2],
                duration: 0.5,
            });
            tl.to(meshRef.current.position, {
                delay: 0.5,
                x: position[0],
                y: position[1],
                z: position[2],
                duration: 1,
            }, "<");
        }
    }, [anim, position, scale, targetColor, setIsAnim, isVoxel, isStatic]);

    return (
        <Instance
            ref={meshRef}
            scale={scale}
            position={[0, 0, 0]}
            color={'white'} />
    );
}