import React from "react";

import { UserProvider } from "./context/UserContext";
import Routes from "./routes/Routes";
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
