import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useCreateTodoMutation } from "../../../app/services/todosApi";
import { Todo } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import CustomForm from "../../../components/common/Form/CustomForm";

const AddTodo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const currentUser = useSelector(selectUser);
  const [addTodo] = useCreateTodoMutation();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const handleAddTodo = async (todo: Todo) => {
    try {
      await addTodo({ todo, userId: currentUser?.data.user.id }).unwrap();
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
      btnText="Add"
      firstInput="title"
      secondInput="description"
      onFinish={handleAddTodo}
      error={error}
    />
  );
};

export default AddTodo;
