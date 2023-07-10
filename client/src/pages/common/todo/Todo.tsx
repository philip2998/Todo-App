import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetTodoQuery,
  useRemoveTodoMutation,
} from "../../../app/services/todosApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { Descriptions, Divider, Space, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Paths } from "../../../paths";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomButton from "../../../components/common/Button/CustomButton";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import Layout from "../../../components/layout/Layout";
import Modal from "../../../components/common/Modal/Modal";

const Todo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetTodoQuery(params.id || "");
  const [removeTodo] = useRemoveTodoMutation();
  const user = useSelector(selectUser);

  if (isLoading) return <Spin tip="loading" size="large" />;
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
        <Descriptions.Item label="title" span={3} className="bg-light">
          {`${data.title}`}
        </Descriptions.Item>
        <Descriptions.Item label="description" span={3} className="bg-light">
          {`${data.description}`}
        </Descriptions.Item>
      </Descriptions>
      {(user?.data.user.id === data.userId ||
        user?.data.user.role === "admin") && (
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
              type="primary"
              icon={<DeleteOutlined />}
              onClick={showModal}
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deletion"
        btnText="Confirm"
        show={isModalOpen}
        close={hideModal}
        handleFunctionality={handleDeleteTodo}
        children="Do you really want to delete this todo?"
      />
    </Layout>
  );
};

export default Todo;
