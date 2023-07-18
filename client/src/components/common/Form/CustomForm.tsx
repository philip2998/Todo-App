import { Card, Form, Space } from "antd";
import { Todo, UserData } from "../../../types";

import StatusMessage from "../../statusMessage/StatusMessage";
import CustomButton from "../Button/CustomButton";
import CustomInput from "../Input/CustomInput";

type CustomFormProps<T> = {
  firstInput: string;
  btnText: string;
  secondInput?: string;
  className?: string;
  onFinish?: (values: T) => void;
  title?: string;
  message?: string | undefined;
  messageType?: "error" | "success" | "info" | "warning" | undefined;
  description?: string;
  type?: T;
};

const CustomForm = <T extends Todo | UserData>({
  onFinish,
  title,
  btnText,
  className,
  message,
  messageType,
  type,
  firstInput,
  secondInput,
}: CustomFormProps<T>) => {
  return (
    <>
      <StatusMessage message={message} type={messageType} />
      <Card title={title} style={{ width: "30rem" }} className={className}>
        <Form name="Custom form" onFinish={onFinish} initialValues={type}>
          {firstInput && (
            <CustomInput
              type="text"
              name={firstInput}
              placeholder={firstInput}
            />
          )}
          {secondInput && (
            <CustomInput
              type="text"
              name={secondInput}
              placeholder={secondInput}
            />
          )}
          <Space>
            <CustomButton htmlType="submit">{btnText}</CustomButton>
          </Space>
        </Form>
      </Card>
    </>
  );
};

export default CustomForm;
