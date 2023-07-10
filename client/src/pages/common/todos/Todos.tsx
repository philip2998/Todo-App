import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import {
  useCreateTodoMutation,
  useGetUserTodosQuery,
} from "../../../app/services/todosApi";
import { useState } from "react";
import { Button, Table } from "antd";
import { Todo } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useEffect } from "react";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import type { ColumnsType } from "antd/es/table";

import CustomButton from "../../../components/common/Button/CustomButton";
import CustomForm from "../../../components/common/Form/CustomForm";
import Layout from "../../../components/layout/Layout";
import Modal from "../../../components/common/Modal/Modal";

const Todos = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector(selectUser);
  const { data, isLoading } = useGetUserTodosQuery(user?.data.user.id || "");
  const [addTodo] = useCreateTodoMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleAddTodo = async (data: Todo) => {
    try {
      await addTodo(data).unwrap();
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown Error");
      }
    }
  };

  const goToAllUsers = () => navigate(Paths.allUsers);
  const goToAllTodos = () => navigate(Paths.allTodos);
  const goToAddUser = () => navigate(Paths.createUser);

  const isAdmin = user?.data.user.role === "admin";
  const adminButtons = [
    {
      text: "All Users",
      icon: <UserOutlined />,
      onClick: () => goToAllUsers(),
    },
    {
      text: "All Todos",
      icon: <UnorderedListOutlined />,
      onClick: () => goToAllTodos(),
    },
    {
      text: "Create User",
      icon: <UserAddOutlined />,
      onClick: () => goToAddUser(),
    },
  ];

  const columns: ColumnsType<Todo> = [
    {
      title: <span className="table-column-title">Title</span>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <span className="table-column-title">Description</span>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <span className="table-column-title">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditFilled />}
            onClick={() => console.log(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteFilled />}
            onClick={() => console.log(record)}
          />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="d-flex mb-2">
        <CustomButton
          type="primary"
          onClick={showModal}
          icon={<PlusCircleOutlined />}
          className="ms-2"
        >
          Add Todo
        </CustomButton>
        {isAdmin &&
          adminButtons.map((button, index) => (
            <CustomButton
              key={index}
              type="primary"
              onClick={button.onClick}
              icon={button.icon}
              className="ms-2"
            >
              {button.text}
            </CustomButton>
          ))}
      </div>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        columns={columns}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.todo}/${record._id}`),
          };
        }}
      />
      <Modal
        title="Add new Todo"
        btnText="Add"
        show={isModalOpen}
        close={hideModal}
        handleFunctionality={handleAddTodo}
        children={
          <CustomForm
            firstInput="title"
            secondInput="description"
            error={error}
          />
        }
      />
    </Layout>
  );
};

export default Todos;
