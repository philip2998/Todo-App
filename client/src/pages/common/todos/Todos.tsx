import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { Todo } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useEffect } from "react";
import { useGetUserTodosQuery } from "../../../app/services/todosApi";
import type { ColumnsType } from "antd/es/table";

import CustomButton from "../../../components/common/Button/CustomButton";
import Layout from "../../../components/layout/Layout";

const columns: ColumnsType<Todo> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const Todos = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetUserTodosQuery(user?.data.user.id || "");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const goToAddTodo = () => navigate(Paths.todoAdd);
  const goToAllUsers = () => navigate(Paths.allUsers);
  const goToAllTodos = () => navigate(Paths.allTodos);
  const goToAddUser = () => navigate(Paths.addUser);

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

  return (
    <Layout>
      <div className="d-flex mb-2">
        <CustomButton
          type="primary"
          onClick={goToAddTodo}
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
        pagination={false}
        columns={columns}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.todo}/${record._id}`),
          };
        }}
      />
    </Layout>
  );
};

export default Todos;
