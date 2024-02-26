import PropTypes from 'prop-types';
import { ScrollControls } from '@react-three/drei';
import LoadModels from './LoadModels';
import { useState } from 'react';

Scroll.propTypes = { models: PropTypes.array, currentScene: PropTypes.number, setCurrentScene: PropTypes.func };

function Scroll({ models, currentScene, setCurrentScene }) {
    const [scrollOfset, setScrollOfset] = useState(0);

    return (
        <ScrollControls pages={models.length} >
            <LoadModels modelURLs={models} currentScene={currentScene} setCurrentScene={setCurrentScene} setScrollOfset={setScrollOfset} scrollOfset={scrollOfset} />
        </ScrollControls>
    );
}

export default Scroll;
