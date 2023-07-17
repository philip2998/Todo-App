import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../../app/services/todosApi";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Spin } from "antd";
import { Todo } from "../../../types";

import CustomForm from "../../../components/common/Form/CustomForm";

type EditTodoProps = {
  todoId: string;
};

const EditTodo = ({ todoId }: EditTodoProps) => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

  const { data, isLoading } = useGetTodoQuery({ todoId, userId: id });
  const [editTodo] = useUpdateTodoMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleEditTodo = async (todo: Todo) => {
    try {
      const editedTodo = {
        ...data,
        ...todo,
      };
      await editTodo({ todo: editedTodo, userId: id }).unwrap();
      setMessage("Todo edited successfully!");
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
        firstInput="title"
        secondInput="description"
        message={message}
        messageType={messageType}
        type={data}
        onFinish={handleEditTodo}
      />
    </>
  );
};

export default EditTodo;
