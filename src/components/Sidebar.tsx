import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  UnorderedListOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SidebarProps } from "./Types";

const { Sider } = Layout;
const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Supply Side Platform</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UnorderedListOutlined />,
              label: "Campaigns",
            },
            {
              key: "2",
              icon: <UserSwitchOutlined />,
              label: "User Management",
            },
            {
              key: "3",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
