import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../app/services/usersApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Spin } from "antd";
import { UserData } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomForm from "../../../components/common/Form/CustomForm";

const EditUser = () => {
  const params = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

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
      setMessage("User edited successfully !");
      setMessageType("info");
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setMessage(err.data.message);
        setMessageType("error");
      } else {
        setMessage("Unknown Error");
      }
    }
  };

  return (
    <>
      <CustomForm
        btnText="Edit"
        firstInput="name"
        secondInput="email"
        message={message}
        messageType={messageType}
        type={data}
        onFinish={handleEditUser}
      />
    </>
  );
};

export default EditUser;
