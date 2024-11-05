import React, { createContext, useContext, useReducer } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const initialState = {
  isLoggedIn: Cookies.get('isLoggedIn') === 'true', // Check if logged in via cookie
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      Cookies.set('isLoggedIn', 'true', { expires: 1 }); // Set cookie on login
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      Cookies.remove('isLoggedIn'); // Remove cookie on logout
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
