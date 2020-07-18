const HIDE_SNACKBAR = 'UI_HIDE_SNACKBAR';
const SHOW_SNACKBAR = 'UI_SHOW_SNACKBAR';

export const hideSnackbar = () => ({ type: HIDE_SNACKBAR });
export const showSnackbar = (variant, message) => ({
  type: SHOW_SNACKBAR,
  payload: { variant, message }
});

const INIT_STATE = {
  snackbar: null,
};

export const uiReducer = (state = INIT_STATE, action) => {
  if (
    !action.type.match('auth/') &&
    action.type.match('_FAILURE') &&
    action.payload.status &&
    action.payload.status !== 401
  ) {
    return {
      ...state,
      snackbar: { variant: 'error', message: 'shouldReload' }
    };
  }

  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, snackbar: action.payload };
    case HIDE_SNACKBAR:
      return { ...state, snackbar: null };
    default:
      return state;
  }
};
