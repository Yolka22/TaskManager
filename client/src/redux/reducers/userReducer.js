//user reducer
const initialState = {
  logedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload)
      return { ...state, logedUser: action.payload };

    case "LOGOUT":
      return { ...state, logedUser: null };

    default:
      return state;
  }
};

export default userReducer;
