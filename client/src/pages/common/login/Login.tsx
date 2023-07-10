import { Row, Card, Form, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useLoginMutation } from "../../../app/services/authApi";
import { User } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";

import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import Layout from "../../../components/layout/Layout";
import CustomInput from "../../../components/common/Input/CustomInput";
import PasswordInput from "../../../components/common/Input/PasswordInput";
import CustomButton from "../../../components/common/Button/CustomButton";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [error, setError] = useState("");

  const handleLogin = async (data: User) => {
    try {
      const response = await loginUser(data).unwrap();
      const userId = response.data.user.id;
      navigate(`${Paths.userTodos}/${userId}`);
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown Error. Please try later.");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: "30rem" }}>
          <ErrorMessage message={error} />
          <Form onFinish={handleLogin}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account? <Link to={Paths.signup}> Sign up</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
