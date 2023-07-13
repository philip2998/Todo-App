import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useCreateTodoMutation } from "../../../app/services/todosApi";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { Todo } from "../../../types";

import CustomForm from "../../../components/common/Form/CustomForm";

const AddTodo = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);

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
      setMessage("Todo added successfully!");
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
        btnText="Add"
        firstInput="title"
        secondInput="description"
        onFinish={handleAddTodo}
        message={message}
        messageType={messageType}
      />
    </>
  );
};

export default AddTodo;
