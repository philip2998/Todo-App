import {
  useGetUserQuery,
  useDeleteUserMutation,
} from "../../../app/services/usersApi";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Descriptions, Divider, Modal, Space, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Paths } from "../../../paths";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomButton from "../../../components/common/Button/CustomButton";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import Layout from "../../../components/layout/Layout";

const User = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;
  if (!data) return <Navigate to="/login" />;

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await deleteUser(data.id).unwrap();
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown Error");
      }
    }
  };

  return (
    <Layout>
      <Descriptions title="Information about User" bordered>
        <Descriptions.Item label="Name" span={3} className="bg-light">
          {`${data.name}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3} className="bg-light">
          {`${data.email}`}
        </Descriptions.Item>
      </Descriptions>
      <>
        <Divider orientation="left">Actions</Divider>
        <Space>
          <Link to={`${Paths.userEdit}/${data.id}`}>
            <CustomButton shape="round" type="default" icon={<EditOutlined />}>
              Edit
            </CustomButton>
          </Link>
          <CustomButton
            shape="round"
            danger
            onClick={showModal}
            icon={<DeleteOutlined />}
          >
            Delete
          </CustomButton>
        </Space>
      </>
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deletion"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you really want to delete your profile?
      </Modal>
    </Layout>
  );
};

export default User;
