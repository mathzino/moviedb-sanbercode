import React, { useState } from "react";
import "antd/dist/antd.css";
import Navbar from "../Navbar";

import { Layout, Menu, Breadcrumb } from "antd";
import Footers from "../Footer";
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";

import Cookies from "js-cookie";
import HeaderComp from "../Header";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Layouts = (props) => {
  return (
    <>
      <Layout className="layout">
        <HeaderComp />
        <Layout>
          {Cookies.get("token") !== undefined && <Navbar />}
          <Layout>
            <Content style={{ minHeight: "280", paddingTop: "64px" }} className={Cookies.get("token") ? "site-layout-home" : ""}>
              {props.content}
            </Content>
          </Layout>
        </Layout>
        <Footers />
      </Layout>
    </>
  );
};

export default Layouts;
