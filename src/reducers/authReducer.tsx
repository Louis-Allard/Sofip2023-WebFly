const initialState = {};

const authReducer = (state = initialState, action: any) => {
  if (action.type === "DATA") {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === "RESET") {
    return {
      initialState,
    };
  }

  return state;
};

export default authReducer;
