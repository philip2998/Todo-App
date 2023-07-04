import { Card, Form, Space } from "antd";
import { Todo, User } from "../../../types";

import CustomInput from "../Input/CustomInput";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import CustomButton from "../Button/CustomButton";

type CustomFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  description?: string;
  error?: string | undefined;
  type?: T;
};

const CustomForm = <T extends Todo | User>({
  onFinish,
  title,
  btnText,
  error,
  type,
}: CustomFormProps<T>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="Custom form" onFinish={onFinish} initialValues={type}>
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

export default CustomForm;
