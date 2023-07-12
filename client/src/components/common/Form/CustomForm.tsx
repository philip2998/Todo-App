import { Card, Form, Space } from "antd";
import { Todo, UserData } from "../../../types";

import CustomInput from "../Input/CustomInput";
import StatusMessage from "../../statusMessage/StatusMessage";
import CustomButton from "../Button/CustomButton";

type CustomFormProps<T> = {
  onFinish?: (values: T) => void;
  btnText?: string;
  title?: string;
  firstInput: string;
  secondInput: string;
  description?: string;
  error?: string | undefined;
  type?: T;
};

const CustomForm = <T extends Todo | UserData>({
  onFinish,
  title,
  btnText,
  error,
  type,
  firstInput,
  secondInput,
}: CustomFormProps<T>) => {
  return (
    <>
      <StatusMessage message={error} type="error" />
      <Card title={title} style={{ width: "30rem" }}>
        <Form name="Custom form" onFinish={onFinish} initialValues={type}>
          <CustomInput type="text" name={firstInput} placeholder="Title" />
          <CustomInput
            type="text"
            name={secondInput}
            placeholder="Description"
          />
          <Space>
            <CustomButton htmlType="submit">{btnText}</CustomButton>
          </Space>
        </Form>
      </Card>
    </>
  );
};

export default CustomForm;
