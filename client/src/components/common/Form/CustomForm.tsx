import { Card, Form, Space } from "antd";
import { Todo, UserData } from "../../../types";

import StatusMessage from "../../statusMessage/StatusMessage";
import CustomButton from "../Button/CustomButton";
import CustomInput from "../Input/CustomInput";

type CustomFormProps<T> = {
  firstInput: string;
  btnText: string;
  onFinish?: (values: T) => void | Promise<void>;
  secondInput?: string;
  thirdInput?: string;
  className?: string;
  title?: string;
  message?: string | undefined;
  messageType?: "error" | "success" | "info" | "warning" | undefined;
  description?: string;
  type?: T;
};

const CustomForm = <T extends Todo | UserData | object>({
  onFinish,
  title,
  btnText,
  className,
  message,
  messageType,
  type,
  firstInput,
  secondInput,
  thirdInput,
}: CustomFormProps<T>) => {
  const inputs = [
    { name: firstInput, placeholder: firstInput },
    { name: secondInput, placeholder: secondInput },
    { name: thirdInput, placeholder: thirdInput },
  ];
  return (
    <>
      <StatusMessage message={message} type={messageType} />
      <Card title={title} style={{ width: "30rem" }} className={className}>
        <Form name="Custom form" onFinish={onFinish} initialValues={type}>
          {inputs.map(
            (input, index) =>
              input.name && (
                <CustomInput
                  key={index}
                  type="text"
                  name={input.name}
                  placeholder={input.placeholder || ""}
                />
              )
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
