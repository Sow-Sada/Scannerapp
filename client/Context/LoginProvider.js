import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.189.2:8000/auth/loggedin-user")

      .then((res) => setIsLoggedIn(res.data.name ? true : false))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.189.2:8000/auth/loggedin-user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("vvvvvv", err);
      });
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, user, setUser }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
