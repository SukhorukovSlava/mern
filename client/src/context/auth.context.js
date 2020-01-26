import {createContext} from 'react';

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: function() {},
  logout: function() {},
  isAuthenticated: false
});