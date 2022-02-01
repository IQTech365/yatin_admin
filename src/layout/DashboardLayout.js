import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { Footer } from "antd/lib/layout/layout";

const DashboardLayout = (props) => {
  return (
    <Layout>
      <TopNavbar />
      <Layout>
        <SideNavbar />
        <Layout>
          <Layout.Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#FFF", minHeight: 360 }}>
              <Outlet />
            </div>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
