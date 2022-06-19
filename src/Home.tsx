import React, { useEffect, useState } from "react";
import { Button, Layout, Table, Modal, notification } from "antd";
import "antd/dist/antd.css";
import "./assets/campaigns.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Sidebar from "./components/Sidebar";
import API from "./axios/api";
import { NotificationType } from "./components/Types";

const { Header, Content } = Layout;

const { confirm } = Modal;

const Home = () => {
  // states
  const [collapsed, setCollapsed] = useState(false);

  const [campaigns, setCampaigns] = useState<any[]>([]);

  // const [notification, setNotification] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  let notificationMessage = "";

  // functions
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await API.get("campaigns");
        // console.log(response.data.data);
        setCampaigns(response.data.data);
      } catch (error: any) {
        // use the right error reporting component
        console.error(error.message);
      }
    }
    fetchCampaigns();
  }, []);

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: notificationMessage,
      placement: "top",
    });
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Are you sure you want to delete this campaign?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This is an irreversible action, once deleted, all relative data will be lost.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          const response = await API.delete(`campaigns/${id}`);
          if (response.status === 204) {
            setSuccessMessage("The campaign has been successfully deleted!");
            notificationMessage = successMessage;
            // show alert success message
            openNotificationWithIcon("success");
            // filter out the deleted campaign
            const newCampaigns = campaigns.filter(
              (campaign: any) => campaign.id !== id
            );
            setCampaigns(newCampaigns);
          }
        } catch (error: any) {
          // show alert error message
          console.log(error);
          setErrorMessage(error.message);
          notificationMessage = errorMessage;
          openNotificationWithIcon("error");
        }
      },
    });
  };

  const previewCampaign = (id: number) => {};

  const EditCampaign = (id: number) => {};

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "2",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "3",
    },
    {
      title: "Daily Budget",
      dataIndex: ["dailyBudget"],
      render: (text: number) => <span>{text}</span>,
      key: "4",
    },
    {
      title: "Total Budget",
      dataIndex: "totalBudget",
      render: (text: number) => <span>{text}</span>,
      key: "5",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text: number) => (
        <>
          <Button
            type="primary"
            className="warning"
            onClick={() => previewCampaign(text)}
          >
            Preview
          </Button>{" "}
          <Button type="primary" onClick={() => EditCampaign(text)}>
            Edit
          </Button>{" "}
          <Button type="primary" danger onClick={() => showDeleteConfirm(text)}>
            Delete
          </Button>
        </>
      ),
      key: "6",
    },
  ];

  return (
    <>
      <Layout>
        <Sidebar collapsed={collapsed} />
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
            <div className="button-handler">
              <Button type="primary">Create Campaign</Button>
            </div>
            <Table columns={columns} dataSource={campaigns} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
