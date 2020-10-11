import * as types from './types';

const INITIAL_STATE = {
    auth: {
        roles: ['Anon']
    }
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case types.REGISTER: 
            return { ...state, auth: state }
        case types.LOGIN: 
            return { ...state, auth: state }
        default: 
            return state;
    }
}