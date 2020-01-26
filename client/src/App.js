import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/auth.context";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {NavBar} from "./components/NavBar";
import 'materialize-css';
import {Loader} from "./components/Loader";

const App = () => {

  const {login, logout, token, userId, ready} = useAuth();

  const isAuthenticated = !!token;

  const ctx = {login, logout, token, userId, isAuthenticated};

  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={ctx}>
      <Router>
        {isAuthenticated && <NavBar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;