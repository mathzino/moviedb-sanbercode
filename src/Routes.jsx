import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import { UserProvider } from "./UserContext";
import Register from "./Register";
import Cookies from "js-cookie";
import HeaderComp from "./Header";
import Home from "./Home";
// import Dashboard from "./Dashbord";
import Navbar from "./Navbar";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import TableMovie from "./TableMovie";
import { MovieProvider } from "./context/MovieContext";
import { GameProvider } from "./context/GameContext";
import MovieForm from "./MovieForm";
import GameForm from "./GameForm";
import { useLocation } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import TableGame from "./TableGame";
import Movie from "./Movie";
import Game from "./Game";
import Footers from "./Footer";
import Layouts from "./Layout/Layout";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Routes = () => {
  const { loginStatus, setLoginStatus } = UserProvider;
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
        <UserProvider>
          <MovieProvider>
            <GameProvider>
              {/* <Layout>
                <HeaderComp />
                <Layout> */}
              {/* {Cookies.get("token") !== undefined && <Navbar />}
                  <Layout> */}
              {/* <Layout style={{ padding: "0 " }}> */}
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
        </UserProvider>
      </Router>
    </>
  );
};
export default Routes;
