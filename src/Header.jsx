import Cookies from "js-cookie";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./Meta.png";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
const HeaderComp = () => {
  const { setLoginStatus } = useContext(UserContext);
  let history = useHistory();
  const handleLogout = () => {
    setLoginStatus(false);
    Cookies.remove("user");
    Cookies.remove("email");
    Cookies.remove("token");
    history.push("/");
    window.location.reload();
  };
  return (
    <>
      <Layout>
        <Header className="header" style={{ position: "fixed", top: "0", zIndex: "100", width: "100%" }}>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="lah" />
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/movie">Movie </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/game">Game</Link>
            </Menu.Item>
            {Cookies.get("token") !== undefined && (
              <Menu.Item key="2">
                <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </span>
              </Menu.Item>
            )}
            {Cookies.get("token") === undefined && (
              <>
                <Menu.Item key="3">
                  <Link to="/login">Login </Link>
                </Menu.Item>

                <Menu.Item key="4">
                  <Link to="/register">Register </Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
      </Layout>
    </>
  );
};
export default HeaderComp;
