import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import { useGetUserTodosQuery } from "../../../app/services/todosApi";
import { useState } from "react";
import { Button, Table } from "antd";
import { Todo } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useEffect } from "react";
import type { ColumnsType } from "antd/es/table";

import CustomButton from "../../../components/common/Button/CustomButton";
import Layout from "../../../components/layout/Layout";
import Modal from "../../../components/common/Modal/Modal";
import AddTodo from "../addTodo/AddTodo";
import EditTodo from "../editTodo/EditTodo";
import DeleteTodo from "../deleteTodo/DeleteTodo";

const Todos = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<JSX.Element | string>(
    ""
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const params = useParams<{ id: string }>();

  const currentUser = useSelector(selectUser);
  const { data, isLoading } = useGetUserTodosQuery(params.id || "");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const isAdmin = currentUser?.data.user.role === "admin";
  const adminButtons = [
    {
      text: "All Users",
      icon: <UserOutlined />,
      onClick: () => navigate(Paths.allUsers),
    },
    {
      text: "All Todos",
      icon: <UnorderedListOutlined />,
      onClick: () => navigate(Paths.allTodos),
    },
    {
      text: "Create User",
      icon: <UserAddOutlined />,
      onClick: () => navigate(Paths.createUser),
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
            onClick={() => {
              showModal();
              setModalTitle("Edit Todo");
              setModalButtonText("Edit");
              setModalComponent(<EditTodo />);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteFilled />}
            onClick={() => {
              showModal();
              setModalTitle("Delete Todo");
              setModalButtonText("Delete");
              setModalComponent(<DeleteTodo />);
            }}
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
          onClick={() => {
            showModal();
            setModalTitle("Add Todo");
            setModalButtonText("Add");
            setModalComponent(<AddTodo />);
          }}
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
      />
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

export default Todos;
