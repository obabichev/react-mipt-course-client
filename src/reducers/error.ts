import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const error = createSlice({
    name: 'error',
    initialState: null as string | null,
    reducers: {
        setError: (state, action: PayloadAction<string>) => action.payload,
        clearError: () => null
    }
});

export const {setError, clearError} = error.actions;

export default error.reducer;
