import { Row, Card, Form, Space, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation } from "../../app/services/authApi";
import { User } from "../../types";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Layout from "../../components/layout/Layout";
import CustomInput from "../../components/common/Input/CustomInput";
import PasswordInput from "../../components/common/Input/PasswordInput";
import CustomBotton from "../../components/common/Button/CustomButton";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [error, setError] = useState("");

  const handleLogin = async (data: User) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown Error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: "30rem" }}>
          <Form onFinish={handleLogin}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomBotton type="primary" htmlType="submit">
              Login
            </CustomBotton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account? <Link to={Paths.signup}> Sign up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
