import { State } from '@/state';
import {createSlice} from '@reduxjs/toolkit';

export const stateSlice = createSlice({
    name: 'state',
    initialState: { value: 'overview' as State },
    reducers: {
        setState: (state, action) => {
            state.value = action.payload;
        },
    },
});
