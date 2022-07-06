//npm
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
//context management
import { MovieProvider } from "../context/MovieContext";
import { GameProvider } from "../context/GameContext";
//component
import Login from "../component/organism/Login/Login";
import Register from "../component/organism/Register/Register";
import Home from "../Home";
import TableMovie from "../component/organism/TableMovie/TableMovie";
import MovieForm from "../component/organism/MovieForm/MovieForm";
import GameForm from "../component/organism/GameForm/GameForm";
import ChangePassword from "../component/organism/ChangePassword/ChangePassword";
import TableGame from "../component/organism/TableGame/TableGame";
import Movie from "../component/organism/Movie/Movie";
import Game from "../component/organism/Game/Game";

import Layouts from "../Layout/Layout";

const Routes = () => {
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Redirect to="/" />;
    } else {
      return <Route {...props} />;
    }
  };
  const PrivateRoute = ({ ...props }) => {
    if (Cookies.get("token") === undefined) {
      return <Redirect to="/" />;
    } else {
      return <Route {...props} />;
    }
  };

  return (
    <>
      <Router>
        <MovieProvider>
          <GameProvider>
            <Switch>
              <Route path="/" exact>
                <Layouts content={<Home />} />
              </Route>
              <LoginRoute exact path="/login">
                <Layouts content={<Login />} />
              </LoginRoute>
              <LoginRoute exact path="/register">
                <Layouts content={<Register />} />
              </LoginRoute>
              <Route exact path="/movie">
                <Layouts content={<Movie />} />
              </Route>
              <Route exact path="/Game">
                <Layouts content={<Game />} />
              </Route>
              <PrivateRoute exact path="/dashboard/movie/table">
                <Layouts content={<TableMovie />} />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/game/table">
                <Layouts content={<TableGame />} />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/movie/form">
                <Layouts content={<MovieForm />} />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/game/form">
                <Layouts content={<GameForm />} />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/movie/form/:id">
                <Layouts content={<MovieForm />} />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/game/form/:id">
                <Layouts content={<GameForm />} />
              </PrivateRoute>
              <PrivateRoute exact path="/profile/change-password">
                <Layouts content={<ChangePassword />} />
              </PrivateRoute>
            </Switch>
          </GameProvider>
        </MovieProvider>
      </Router>
    </>
  );
};
export default Routes;
