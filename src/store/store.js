import { configureStore } from '@reduxjs/toolkit';

import stateModelsReducer from './reducers/stateModels';

const store = configureStore({
    reducer: {
        stateModels: stateModelsReducer,
    },
});

export default store;