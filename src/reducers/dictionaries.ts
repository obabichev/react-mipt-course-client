import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Dictionary} from '../types';

const dictionaries = createSlice({
    name: 'dictionaries',
    initialState: {
        categories: [],
        'board-icons': []
    } as { categories: Dictionary[], 'board-icons': Dictionary[] },
    reducers: {
        setDictionary: ((state, {payload: {name, items}}: PayloadAction<{ name: string, items: Dictionary[] }>) => ({
            ...state,
            [name]: items
        }))
    }
});

export const {setDictionary} = dictionaries.actions;

export const fetchDictionaries = (name: 'categories' | 'board-icons') => (dispatch: Dispatch) => {
    fetch(`/dictionaries/${name}`)
        .then(r => r.json())
        .then(items => {
            dispatch(setDictionary({name, items}));
        })
        .catch(error => {
            console.log('error', error);
        })
};

export default dictionaries.reducer;