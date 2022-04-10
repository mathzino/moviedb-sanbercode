import React, { useState } from "react";
import "antd/dist/antd.css";
import Navbar from "../component/organism/Navbar/Navbar";

import { Layout, Menu } from "antd";
import Footers from "../component/organism/Footer/Footer";

import Cookies from "js-cookie";
import HeaderComp from "../component/organism/Header/Header";
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
