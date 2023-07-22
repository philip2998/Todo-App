import { useUpdatePasswordMutation } from "../../../app/services/usersApi";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { useGetUserQuery } from "../../../app/services/usersApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { UserData } from "../../../types";
import { Spin } from "antd";

import CustomForm from "../../../components/common/Form/CustomForm";

const UpdatePassword = () => {
  const params = useParams<{ id: string }>();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const { data, isLoading } = useGetUserQuery(params.id || "");
  const [updatePassword] = useUpdatePasswordMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleUpdatePassword = async (values: {
    passwordCurrent: string;
    password: string;
    passwordConfirm: string;
  }) => {
    try {
      await updatePassword({ user: data as UserData, ...values }).unwrap();
      setMessage("Password updated successfully!");
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
        btnText="Update"
        firstInput="passwordCurrent"
        secondInput="password"
        thirdInput="passwordConfirm"
        message={message}
        messageType={messageType}
        onFinish={handleUpdatePassword}
      />
    </>
  );
};

export default UpdatePassword;
