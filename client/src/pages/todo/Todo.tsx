import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetTodoQuery,
  useRemoveTodoMutation,
} from "../../app/services/todosApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Modal, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import CustomButton from "../../components/common/Button/CustomButton";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Layout from "../../components/layout/Layout";

const Todo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetTodoQuery(params.id || "");
  const [removeTodo] = useRemoveTodoMutation();
  const user = useSelector(selectUser);

  if (isLoading) return <span>Loading...</span>;
  if (!data) return <Navigate to="/" />;

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleDeleteTodo = async () => {
    hideModal();

    try {
      await removeTodo(data._id).unwrap();
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
      <Descriptions title="Information about Todo" bordered>
        <Descriptions.Item label="title" span={3}>
          {`${data.title}`}
        </Descriptions.Item>
        <Descriptions.Item label="description" span={3}>
          {`${data.description}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`/todos/edit/${data._id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
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
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deletion"
        open={isModalOpen}
        onOk={handleDeleteTodo}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you really want to delete ?
      </Modal>
    </Layout>
  );
};

export default Todo;
