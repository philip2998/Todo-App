import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../app/services/usersApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Row, Spin } from "antd";
import { UserData } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import Layout from "../../../components/layout/Layout";
import CustomForm from "../../../components/common/Form/CustomForm";

const EditUser = () => {
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");

  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [editUser] = useUpdateUserMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleEditUser = async (user: UserData) => {
    try {
      const editedUser = {
        ...data,
        ...user,
      };
      await editUser(editedUser).unwrap();
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
      <Row align="middle" justify="center">
        <CustomForm
          title="Information About User"
          btnText="Edit"
          firstInput="name"
          secondInput="role"
          error={error}
          type={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};

export default EditUser;
