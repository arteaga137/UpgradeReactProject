import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  //Children means every component that's inside the app.jsx file (since i used AuthProvider in the main.js file wrapping the app)
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

  // Listens for changes in the cookies object. If the authToken cookie exists, it updates the user state, making the component reactive to changes in cookies.
  useEffect(() => {
    if (cookies.authToken) {
      setUser(cookies.authToken.user);
    }
  }, [cookies]);

  //Login updates the user state and stores the token in a cookie
  const login = (userData, token) => {
    setUser(userData);
    setCookie("authToken", { user: userData, token }, { path: "/" });
  };

  const logout = () => {
    setUser(null);
    removeCookie("authToken", { path: "/" });
  };

  /**
   * Determines the authentication status of the user based on the presence of an authentication token.
   *
   * This function evaluates the current state of the `token` variable, which is expected to hold the
   * authentication token of the user. It returns a boolean value indicating whether the user is considered
   * authenticated.
   *
   * The double negation (`!!`) operator is used to convert the truthiness or falsiness of the `token` into
   * a boolean value. If `token` contains any value other than `null`, `undefined`, `""` (empty string), `0`,
   * or `false`, it is considered truthy, indicating that the user is authenticated. Otherwise, it is considered
   * falsy, indicating that the user is not authenticated.
   *
   * This function is crucial for conditionally rendering components or executing logic based on the user's
   * authentication status. For example, it can be used to redirect unauthenticated users to a login page or
   * to restrict access to certain routes that require authentication.
   *
   * @returns {boolean} - `true` if the user is authenticated (i.e., there is a token), otherwise `false`.
   */
  const isAuth = () => !!cookies.authToken; // Returns true if a token exists, indicating authentication

  // Using a object that will serve as a prop containing the login data I need to use in other components.
  const value = {
    user,
    login,
    logout,
    isAuth,
  };

  console.log(value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
