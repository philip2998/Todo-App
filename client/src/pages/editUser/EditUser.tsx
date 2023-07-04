import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../app/services/usersApi";
import { Row } from "antd";
import { User } from "../../types";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import Layout from "../../components/layout/Layout";
import CustomForm from "../../components/common/Form/CustomForm";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");

  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [editUser] = useUpdateUserMutation();

  if (isLoading) return <span>Loading...</span>;

  const handleEditUser = async (user: User) => {
    try {
      const editedTodo = {
        ...data,
        ...user,
      };
      await editUser(editedTodo).unwrap();
      navigate(`${Paths.status}/updated`);
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
          error={error}
          type={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};

export default EditUser;
