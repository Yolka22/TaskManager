const initialState = {
  logedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, logedUser: action.payload };

    case "LOGOUT":
      return { ...state, logedUser: null };

    default:
      return state;
  }
};

export default userReducer;
