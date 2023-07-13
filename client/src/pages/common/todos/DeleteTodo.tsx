import {
  useGetTodoQuery,
  useRemoveTodoMutation,
} from "../../../app/services/todosApi";
import { Navigate, useParams } from "react-router-dom";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { useState } from "react";
import { Spin } from "antd";

import StatusMessage from "../../../components/statusMessage/StatusMessage";

type DeleteTodoProps = {
  todoId: string;
};

const DeleteTodo = ({ todoId }: DeleteTodoProps) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const { data, isLoading } = useGetTodoQuery({ todoId, userId: id });
  const [removeTodo] = useRemoveTodoMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;
  if (!data) return <Navigate to="/" />;

  const handleDeleteTodo = async () => {
    try {
      await removeTodo({ todoId: data._id, userId: id }).unwrap();
      setMessage("Todo deleted!");
      setMessageType("warning");
    } catch (err) {
      const maybeError = isErrorWithMessages(err);
      if (maybeError) {
        setMessage(err.data.message);
        setMessageType("error");
      } else {
        console.log("Unknown Error");
      }
    }
  };

  return (
    <>
      <StatusMessage message={message} type={messageType} />
      <p className="text-dark">Do you really want to delete this Todo ?</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDeleteTodo}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteTodo;
