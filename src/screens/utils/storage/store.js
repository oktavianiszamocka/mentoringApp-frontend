import { createBrowserHistory } from 'history';
import React from 'react';
// import {
//   middleware as authMiddleware,
//   interceptor
// } from './ducks/auth/middleware';
import { rootReducer, initialState } from './ducks/root';


const GlobalStore = React.createContext();
export const useGlobalStore = () => React.useContext(GlobalStore)

const asyncer = (dispatch, state) => action => {
    typeof action === 'function' ? action(dispatch, state) : dispatch(action)
}

export const Provider = ({ children }) => {
  const [ state, dispatchBase ] = React.useReducer(rootReducer, initialState)

  const dispatch = React.useCallback(asyncer(dispatchBase, state), []);

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStore.Provider>
  )
}

export const history = createBrowserHistory();