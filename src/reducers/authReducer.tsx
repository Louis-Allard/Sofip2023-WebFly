const initialState = {
  isAuth: false,
};

const authReducer = (state = initialState, action: any) => {
  if (action.type === "AUTH") {
    return {
      ...state,
      isAuth: action.payload,
    };
  }

  return state;
};

export default authReducer;
