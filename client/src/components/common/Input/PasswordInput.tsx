import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type PasswordInputProps = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

const PasswordInput = ({
  name,
  placeholder,
  dependencies,
}: PasswordInputProps) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "required field",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("passwords must match"));
            } else {
              if (value.length < 8) {
                return Promise.reject(
                  new Error("password must be at least 8 symbols")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};

export default PasswordInput;
