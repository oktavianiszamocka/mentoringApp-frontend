import { authReducer } from './auth';

export const initialState = {
    auth: {

    }
}

export const rootReducer = (state,  action) => { 
    const { auth } = state;

    return {
        auth: authReducer(auth, action)
    }
}