import { Spin, Table } from "antd";
import { Todo } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useGetAllTodosQuery } from "../../../app/services/todosApi";
import type { ColumnsType } from "antd/es/table";

import Layout from "../../../components/layout/Layout";

const columns: ColumnsType<Todo> = [
  {
    title: "User",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const Todos = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTodosQuery();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleRowClick = (record: Todo) => {
    console.log(record);
    navigate(`${Paths.user}/${record._id}`);
  };

  return (
    <Layout>
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

export default Todos;
