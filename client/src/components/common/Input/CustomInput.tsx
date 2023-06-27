import { Input, Form } from "antd";

type CustomInputProps = {
  name: string;
  placeholder: string;
  type?: string;
};

const CustomInput = ({
  name,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "required field" }]}
      shouldUpdate={true}
    >
      <Input placeholder={placeholder} type={type} size="large"></Input>
    </Form.Item>
  );
};

export default CustomInput;
