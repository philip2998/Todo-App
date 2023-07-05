import { useState, useEffect } from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useCreateTodoMutation } from "../../../app/services/todosApi";
import { Todo } from "../../../types";
import { Paths } from "../../../paths";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import Layout from "../../../components/layout/Layout";
import CustomForm from "../../../components/common/Form/CustomForm";

const AddTodo = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addTodo] = useCreateTodoMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleAddTodo = async (data: Todo) => {
    try {
      await addTodo(data).unwrap();
      navigate(`${Paths.status}/created`);
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
        <CustomForm
          title="Add Todo"
          btnText="Add"
          onFinish={handleAddTodo}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddTodo;
