import { configureStore } from '@reduxjs/toolkit';
import { stateSlice } from './slices/state';

export const store = configureStore({
    reducer: {
        state: stateSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
