import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../../app/services/todosApi";
import { Row } from "antd";
import { Todo } from "../../types";
import { Paths } from "../../paths";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import Layout from "../../components/layout/Layout";
import TodoForm from "../../components/todoForm/TodoForm";

const EditTodo = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetTodoQuery(params.id || "");
  const [editTodo] = useUpdateTodoMutation();

  if (isLoading) return <span>Loading...</span>;

  const handleEditTodo = async (todo: Todo) => {
    try {
      const editedTodo = {
        ...data,
        ...todo,
      };
      await editTodo(editedTodo).unwrap();
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
        <TodoForm
          title="Edit Todo"
          btnText="Edit"
          error={error}
          todo={data}
          onFinish={handleEditTodo}
        />
      </Row>
    </Layout>
  );
};

export default EditTodo;
