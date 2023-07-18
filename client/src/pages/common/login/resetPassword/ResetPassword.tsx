import { useResetPasswordMutation } from "../../../../app/services/authApi";
import { isErrorWithMessages } from "../../../../utils/isErrorWithMessages";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { UserData } from "../../../../types";

import CustomForm from "../../../../components/common/Form/CustomForm";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async (data: UserData) => {
    try {
      await resetPassword({ userData: data, token }).unwrap();
      setMessage("Your password successfully reset");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 3000);
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
        className="ms-auto me-auto mt-5"
        title="Please enter your new password and confirm it."
        btnText="Submit"
        firstInput="password"
        secondInput="passwordConfirm"
        onFinish={handleResetPassword}
        message={message}
        messageType={messageType}
      />
    </>
  );
};

export default ResetPassword;
