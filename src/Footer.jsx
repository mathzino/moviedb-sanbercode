import React from "react";
import Cookies from "js-cookie";

import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

const Footers = () => {
  return (
    <>
      <Footer style={{ padding: "10px 0", zIndex: "100", textAlign: "center", background: "#001529", color: "white", position: "relative", bottom: "0", width: "100%", height: "40px" }}>by mazinoo -</Footer>
    </>
  );
};

export default Footers;
