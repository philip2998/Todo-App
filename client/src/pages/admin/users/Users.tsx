import { Spin, Table } from "antd";
import { UserData } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useGetAllUsersQuery } from "../../../app/services/usersApi";
import type { ColumnsType } from "antd/es/table";

import Layout from "../../../components/layout/Layout";

const columns: ColumnsType<UserData> = [
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

const Users = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleRowClick = (record: UserData) => {
    navigate(`${Paths.user}/${record.id}`);
  };

  return (
    <Layout>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record?.id}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
    </Layout>
  );
};

export default Users;
