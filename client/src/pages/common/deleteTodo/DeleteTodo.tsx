import {
  useGetTodoQuery,
  useRemoveTodoMutation,
} from "../../../app/services/todosApi";
import { Navigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

const DeleteTodo = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetTodoQuery(params.id || "");
  const [removeTodo] = useRemoveTodoMutation();

  if (isLoading) return <Spin tip="loading" size="large" />;
  if (!data) return <Navigate to="/" />;

  const handleDeleteTodo = async () => {
    try {
      await removeTodo(data._id).unwrap();
    } catch (err) {
      const maybeError = isErrorWithMessages(err);
      if (maybeError) {
        console.log(err.data.message);
      } else {
        console.log("Unknown Error");
      }
    }
  };

  return (
    <>
      <h2 className="text-priamry">Do you really want to delete this Todo ?</h2>
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
