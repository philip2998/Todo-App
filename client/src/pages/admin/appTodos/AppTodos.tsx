import { Spin, Table } from "antd";
import { Todo } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useGetAllTodosQuery } from "../../../app/services/todosApi";
import type { ColumnsType } from "antd/es/table";

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
  {
    title: "User",
    dataIndex: "userName",
    key: "userName",
  },
];

const AppTodos = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTodosQuery();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleRowClick = (record: Todo) => {
    navigate(`${Paths.todo}/${record._id}`);
  };

  return (
    <Layout>
      <h4 className="text-dark ms-2 mb-3">App Todos</h4>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record?._id}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
    </Layout>
  );
};

export default AppTodos;
