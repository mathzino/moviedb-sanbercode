import React, { useContext } from "react";

import { UserProvider } from "./UserContext";
import Routes from "./Routes";
const App = () => {
  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
    </>
  );
};

export default App;
