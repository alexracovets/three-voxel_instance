import PropTypes from 'prop-types';
import { ScrollControls, Scroll } from '@react-three/drei';
import LoadModels from './LoadModels';

MeScroll.propTypes = { models: PropTypes.array, currentScene: PropTypes.number, setCurrentScene: PropTypes.func };

function MeScroll({ models, currentScene, setCurrentScene }) {
    return (
        <ScrollControls pages={models.length}>
            <LoadModels modelURLs={models} currentScene={currentScene} setCurrentScene={setCurrentScene} />
            <Scroll />
        </ScrollControls >
    );
}

export default MeScroll;
