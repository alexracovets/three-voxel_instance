import { createSlice } from '@reduxjs/toolkit';

const stateModels = createSlice({
    name: 'stateModels',
    initialState: {
        voxels: {}
    },
    reducers: {
        setVoxel: (state, action) => {
            const { modelIdx, voxel } = action.payload;
            state.voxels[modelIdx] = voxel;
        }
    }
});

export const { setVoxel } = stateModels.actions;

export default stateModels.reducer;