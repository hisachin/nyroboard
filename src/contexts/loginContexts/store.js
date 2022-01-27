import React, { createContext, useReducer } from "react";
import LoginReducer from "./reducer";

const initialState = {
  user: null,
  token: null,
};

export const LoginContext = createContext(initialState);

const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
