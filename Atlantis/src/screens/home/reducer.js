/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
// Initial State
const initialState = {
  isSessionActive: false,
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isSessionActive: action.payload.isSessionActive,
      };
    }

    default: {
      return state;
    }
  }
};
export default homeReducer;