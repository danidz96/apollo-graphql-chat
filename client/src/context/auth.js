import React, { createContext, useReducer, useContext } from 'react';
import jwtDecode from 'jwt-decode';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const token = localStorage.getItem('token');

let user = null;

if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem('token');
  } else {
    user = decodedToken;
  }
} else {
  console.log('No token found');
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const initialState = { user };

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
