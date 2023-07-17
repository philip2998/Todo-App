import { useForgotPasswordMutation } from "../../../../app/services/authApi";
import { isErrorWithMessages } from "../../../../utils/isErrorWithMessages";
import { UserData } from "../../../../types";
import { useState } from "react";

import CustomForm from "../../../../components/common/Form/CustomForm";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (data: UserData) => {
    try {
      await forgotPassword(data).unwrap();
      setMessage("Token sent to your email");
      setMessageType("success");
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
        title="Please enter your email address to search for your account."
        btnText="Submit"
        firstInput="email"
        onFinish={handleForgotPassword}
        message={message}
        messageType={messageType}
      />
    </>
  );
};

export default ForgotPassword;
