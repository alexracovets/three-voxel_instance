import PropTypes from 'prop-types';
import { ScrollControls, Scroll } from '@react-three/drei';
import LoadModels from './LoadModels';
import { useState } from 'react';

MeScroll.propTypes = { models: PropTypes.array, currentScene: PropTypes.number, setCurrentScene: PropTypes.func };

function MeScroll({ models, currentScene, setCurrentScene }) {
    const [scrollOfset, setScrollOfset] = useState(0);

    return (
        <ScrollControls pages={models.length} >
            <LoadModels modelURLs={models} currentScene={currentScene} setCurrentScene={setCurrentScene} setScrollOfset={setScrollOfset} scrollOfset={scrollOfset} />
            <Scroll>
            </Scroll>
        </ScrollControls>
    );
}

export default MeScroll;
