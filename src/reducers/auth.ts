import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types';
import {authService} from '../service/auth';
import {login} from '../App';

const initialState = {user: null, isLoggedIn: false} as { user: User | null, isLoggedIn: boolean; };

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<User>) => ({user: action.payload, isLoggedIn: true}),
        logoutAction: () => initialState
    }
});

export const {logoutAction, loginAction} = auth.actions;

export const loginThunk = (credentials: { email: string, password: string }) => (dispatch: Dispatch) => {
    authService.login(credentials)
        .then(result => {
            login(result);
        })
        .catch(err => {
            console.log('err', err);
        })
};

export const register = (credentials: { name: string, email: string, password: string, checkPassword: string; }) => (dispatch: Dispatch) => {
    authService.register(credentials)
        .then(result => {
            login(result);
        })
        .catch(err => {
            console.log('err', err);
        })
};

export default auth.reducer;