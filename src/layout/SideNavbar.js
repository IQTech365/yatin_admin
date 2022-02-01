import React from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import RouteKeys from "../routes/RouteKeys";

const SideNavbar = (props) => {
  return (
    <Layout.Sider
      breakpoint="lg"
      style={{ height: "100vh" }}
      collapsedWidth={0}
      onBreakpoint={(broken) => {
        console.log(`broken-- ${broken}`);
      }}
      onCollapse={(collapsed, type) => {
        console.log(`collapsed - ${collapsed}, type - ${type}`);
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key={"1"} icon={<UserOutlined />}>
          <Link to={RouteKeys.home}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={"2"} icon={<VideoCameraOutlined />}>
          <Link to="/members">Members</Link>
        </Menu.Item>
        <Menu.Item key={"3"} icon={<UploadOutlined />}>
          <Link to="/media">Group</Link>
        </Menu.Item>
        <Menu.Item key={"4"} icon={<UserOutlined />}>
          <Link to="/profile">Logout</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideNavbar;
