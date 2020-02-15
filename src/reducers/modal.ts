import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {omit} from 'lodash';

export const CREATE_BOARD_MODAL = 'CREATE_BOARD_MODAL';
export const CREATE_TASK_MODAL = 'CREATE_TASK_MODAL';

const modal = createSlice({
    name: 'modal',
    initialState: {} as { [key in string]: { props?: any } },
    reducers: {
        openModal: (state, {payload: {name, props}}: PayloadAction<{ name: string, props?: any }>) => ({
            ...state,
            [name]: {props}
        }),
        closeModal: (state, action: PayloadAction<string>) => omit(state, action.payload)
    }
});

export const {openModal, closeModal} = modal.actions;

export default modal.reducer;
