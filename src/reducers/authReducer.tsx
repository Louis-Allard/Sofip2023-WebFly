const initialState = {
  id: 0,
  username: "",
  roles: false,
  avatar: 0,
};

const authReducer = (state = initialState, action: any) => {
  if (action.type === "AUTH") {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default authReducer;
