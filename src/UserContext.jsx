import React, { useState, createContext } from "react";
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  return <UserContext.Provider value={{ loginStatus, setLoginStatus }}>{props.children}</UserContext.Provider>;
};
