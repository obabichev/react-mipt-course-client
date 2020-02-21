import {ThunkAction} from '@reduxjs/toolkit';
import {RootState} from './index';


export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;


