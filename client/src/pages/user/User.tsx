import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetUserQuery,
  useDeleteUserMutation,
} from "../../app/services/usersApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Modal, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import CustomButton from "../../components/common/Button/CustomButton";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Layout from "../../components/layout/Layout";

const User = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [removeUser] = useDeleteUserMutation();
  const user = useSelector(selectUser);

  if (isLoading) return <span>Loading...</span>;
  if (!data) return <Navigate to="/login" />;

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeUser(data?.data.user.id).unwrap();
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
        <Descriptions.Item label="name" span={3} className="bg-light">
          {`${user?.data.user.name}`}
        </Descriptions.Item>
        <Descriptions.Item label="role" span={3} className="bg-light">
          {`${user?.data.user.role}`}
        </Descriptions.Item>
      </Descriptions>
      <>
        <Divider orientation="left">Actions</Divider>
        <Space>
          <Link to={`${Paths.userEdit}/${user?.data.user.id}`}>
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
