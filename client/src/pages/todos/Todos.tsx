import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllTodosQuery } from "../../app/services/todosApi";
import type { ColumnsType } from "antd/es/table";
import { Todo } from "../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

import CustomButton from "../../components/common/Button/CustomButton";
import Layout from "../../components/layout/Layout";

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
  const { data, isLoading } = useGetAllTodosQuery();

  if (!Array.isArray(data)) {
    return <div>Invalid data format</div>;
  }

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={() => null}
        icon={<PlusCircleOutlined />}
      >
        Add Todo
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.todo}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};

export default Todos;
