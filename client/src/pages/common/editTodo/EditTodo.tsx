import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../../app/services/todosApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Spin } from "antd";
import { Todo } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomForm from "../../../components/common/Form/CustomForm";

const EditTodo = () => {
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");

  const { data, isLoading } = useGetTodoQuery(params.id || "");
  const [editTodo] = useUpdateTodoMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;

  const handleEditTodo = async (todo: Todo) => {
    try {
      const editedTodo = {
        ...data,
        ...todo,
      };
      await editTodo(editedTodo).unwrap();
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
    <CustomForm
      btnText="Edit"
      firstInput="title"
      secondInput="description"
      error={error}
      type={data}
      onFinish={handleEditTodo}
    />
  );
};

export default EditTodo;
