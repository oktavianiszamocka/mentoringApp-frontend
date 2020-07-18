import { register,  login} from '../api';
import * as types from './types';

export const registerAction = (data) => {
    return async = (dispatch) => { 
        try { 
            const res = await register(data);
            dispatch({ type: types.REGISTER, payload: res})
        } catch (err) {
            dispatch({ type: types.REGISTER, payload: err})
        }
    } 
}

export const loginAction = (data) => {
    return async = (dispatch) => { 
        try { 
            const res = await login(data);
            dispatch({ type: types.LOGIN, payload: res})
        } catch (err) {
            dispatch({ type: types.LOGIN, payload: err})
        }
    } 
}