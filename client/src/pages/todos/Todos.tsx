import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllTodosQuery } from "../../app/services/todosApi";
import type { ColumnsType } from "antd/es/table";
import { Todo } from "../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

import CustomButton from "../../components/common/Button/CustomButton";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

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
  const { data, isLoading } = useGetAllTodosQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const goToAddTodo = () => navigate(Paths.todoAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddTodo}
        icon={<PlusCircleOutlined />}
      >
        Add Todo
      </CustomButton>
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
