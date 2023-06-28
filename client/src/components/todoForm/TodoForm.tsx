import { Card, Form, Space } from "antd";
import { Todo } from "../../types";
import CustomInput from "../common/Input/CustomInput";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CustomButton from "../common/Button/CustomButton";

type TodoFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  description?: string;
  error?: string | undefined;
  todo?: T;
};

const TodoForm = ({
  onFinish,
  title,
  btnText,
  error,
  todo,
}: TodoFormProps<Todo>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="todo form" onFinish={onFinish} initialValues={todo}>
        <CustomInput type="text" name="title" placeholder="Title" />
        <CustomInput type="text" name="description" placeholder="Description" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};

export default TodoForm;
