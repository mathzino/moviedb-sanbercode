import React, { useState, createContext } from "react";
export const UserContext = createContext();
export const UserProvider = (props) => {
  console.log(props);
  const [loginStatus, setLoginStatus] = useState(false);
  return <UserContext.Provider value={{ loginStatus, setLoginStatus }}>{props.children}</UserContext.Provider>;
};
