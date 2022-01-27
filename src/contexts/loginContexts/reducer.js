const LoginReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN_BOX":
      return {
        ...state,
        showLoginBox: action.payload,
      };
    case "UPDATE_LOGIN_FLAG":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default LoginReducer;
