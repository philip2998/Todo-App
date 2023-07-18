import { Row, Card, Form, Space, Typography } from "antd";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSignupMutation } from "../../../app/services/authApi";
import { useState } from "react";
import { Paths } from "../../../paths";
import { User } from "../../../types";

import StatusMessage from "../../../components/statusMessage/StatusMessage";
import PasswordInput from "../../../components/common/Input/PasswordInput";
import CustomButton from "../../../components/common/Button/CustomButton";
import CustomInput from "../../../components/common/Input/CustomInput";
import Layout from "../../../components/layout/Layout";

const Signup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [signupUser] = useSignupMutation();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >(undefined);
  const navigate = useNavigate();

  const handleSignup = async (data: User) => {
    try {
      await signupUser(data).unwrap();
      if (id) {
        setMessage("User successfully created!");
        setMessageType("success");
      } else {
        navigate(`${Paths.login}`);
      }
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setMessage(err.data.message);
      } else {
        setMessage("Unknown Error. Please try later");
      }
    }
  };

  if (id) {
    return (
      <Card title="Create User" style={{ width: "30rem", margin: "0 auto" }}>
        <StatusMessage message={message} type={messageType} />
        <Form onFinish={handleSignup}>
          <CustomInput name="name" placeholder="Name" />
          <CustomInput type="email" name="email" placeholder="Email" />
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput
            name="passwordConfirm"
            placeholder="Password Confirm"
          />
          <CustomButton type="primary" htmlType="submit">
            Create
          </CustomButton>
        </Form>
      </Card>
    );
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem", margin: "0 auto" }}>
          <StatusMessage message={message} type={messageType} />
          <Form onFinish={handleSignup}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="passwordConfirm"
              placeholder="Password Confirm"
            />
            <CustomButton type="primary" htmlType="submit">
              Sign up
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an account?<Link to={Paths.login}> Login</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Signup;
