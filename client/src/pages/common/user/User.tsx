import { Descriptions, Divider, Space, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "../../../app/services/usersApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";

import CustomButton from "../../../components/common/Button/CustomButton";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import Layout from "../../../components/layout/Layout";
import Modal from "../../../components/common/Modal/Modal";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const currentUser = useSelector(selectUser);
  const { data, isLoading } = useGetUserQuery(id || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  if (isLoading) return <Spin tip="loading" size="large" className="spinner" />;

  const showModal = (
    title: string,
    buttonText: string,
    component: JSX.Element | null
  ) => {
    setModalTitle(title);
    setModalButtonText(buttonText);
    setModalComponent(component);
    setIsModalOpen(true);
  };
  const hideModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <Descriptions title="Information about User" bordered>
        <Descriptions.Item
          label="NAME"
          span={3}
          className="bg-light fw-bolder fs-3"
        >
          {`${data?.name}`}
        </Descriptions.Item>
        <Descriptions.Item
          label="EMAIL"
          span={3}
          className="bg-light fw-bolder fs-3"
        >
          {`${data?.email}`}
        </Descriptions.Item>
      </Descriptions>
      <>
        <Divider orientation="left">Actions</Divider>
        <Space>
          <CustomButton
            shape="round"
            type="default"
            onClick={() => showModal("Edit Account", "Edit", <EditUser />)}
            icon={<EditOutlined />}
          >
            Edit
          </CustomButton>
          <CustomButton
            shape="round"
            onClick={() =>
              showModal("Delete Account", "Delete", <DeleteUser />)
            }
          >
            Change Password
          </CustomButton>
          <CustomButton
            shape="round"
            danger
            onClick={() =>
              showModal("Delete Account", "Delete", <DeleteUser />)
            }
            icon={<DeleteOutlined />}
          >
            Delete
          </CustomButton>
        </Space>
      </>
      <Modal
        title={modalTitle}
        btnText={modalButtonText}
        show={isModalOpen}
        close={hideModal}
        children={modalComponent}
      />
    </Layout>
  );
};

export default User;
