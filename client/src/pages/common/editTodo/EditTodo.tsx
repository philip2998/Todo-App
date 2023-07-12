import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../../app/services/todosApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { Todo } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomForm from "../../../components/common/Form/CustomForm";
import StatusMessage from "../../../components/statusMessage/StatusMessage";

type EditTodoProps = {
  todoId: string;
};

const EditTodo = ({ todoId }: EditTodoProps) => {
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");

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
    <>
      <StatusMessage message={message} type="info" />
      <CustomForm
        btnText="Edit"
        firstInput="title"
        secondInput="description"
        error={error}
        type={data}
        onFinish={handleEditTodo}
      />
    </>
  );
};

export default EditTodo;
