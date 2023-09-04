const initialState = {
    a: "A",
    b: "B",
    symbol: "",
  };
  
  const testReducer = (state = initialState, action : any) => {
    if (action.type === "SET_A") {
      return {
        ...state,
        a: action.payload,
      };
    }
  
    if (action.type === "SET_B") {
      return {
        ...state,
        b: action.payload,
      };
    }
  
    if (action.type === "UPDATE_SYMBOL") {
      return {
        ...state,
        symbol: action.payload,
      };
    }
    return state;
  };
  
  export default testReducer;
  