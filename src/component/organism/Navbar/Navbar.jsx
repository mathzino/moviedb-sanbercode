import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined, DingtalkOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import Cookies from "js-cookie";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Navbar = () => {
  return (
    <>
      <Sider theme="dark" width={200} className="site-layout-background" style={{ height: "100vh", position: "fixed", top: "64px", zIndex: "100", overflowX: "hidden" }}>
        <Menu mode="inline" defaultSelectedKeys={[""]} defaultOpenKeys={["sub1"]} style={{ height: "100%", borderRight: 0 }}>
          <SubMenu key="sub1" icon={<UserOutlined />} title={"Hi, " + Cookies.get("user")}>
            <Menu.Item key="1">
              <Link to="/profile/change-password">Change Password</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Movie">
            <Menu.Item key="5">
              <Link to="/dashboard/movie/table">Table Movie</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/dashboard/movie/form">Add Movie</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<DingtalkOutlined />} title="Game">
            <Menu.Item key="9">
              <Link to="/dashboard/game/table">Table Game</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/dashboard/game/form">Add Movie</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
};
export default Navbar;
