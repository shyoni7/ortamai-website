import React from 'react';
export const AuthProvider = ({ children }) => {const value = {user: { role: 'admin' },isAuthenticated: true,isLoadingAuth: false,isLoadingPublicSettings: false,authError: null,logout: () => {},navigateToLogin: () => {},checkAppState: () => {},appPublicSettings: {}};return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;};
const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext) || {user:{role:'admin'},isAuthenticated:true};