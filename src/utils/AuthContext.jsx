import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const initialState = {
  isLoggedIn: Cookies.get('isLoggedIn') === 'true' // Read initial state from a cookie
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      Cookies.set('isLoggedIn', 'true', { expires: 1 }); // Set cookie to expire in 1 day
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      Cookies.remove('isLoggedIn');
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
