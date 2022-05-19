import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
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
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Button type="primary">Create Campaign</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
