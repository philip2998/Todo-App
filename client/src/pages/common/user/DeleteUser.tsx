import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../app/services/usersApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { useState } from "react";
import { Spin } from "antd";

import StatusMessage from "../../../components/statusMessage/StatusMessage";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const { data, isLoading } = useGetUserQuery(id || "");
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;
  if (!data) return <Navigate to="/login" />;

  const handleDeleteUser = async () => {
    try {
      await deleteUser(data.id).unwrap();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setMessage("Your account deleted ");
      setMessageType("warning");
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
      <StatusMessage message={message} type={messageType} />
      <p className="text-dark">Do you really want to delete your Account ?</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDeleteUser}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteUser;
