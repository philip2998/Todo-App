import { Row, Card, Form, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useState } from "react";
import { useSignupMutation } from "../../../app/services/authApi";
import { User } from "../../../types";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";

import Layout from "../../../components/layout/Layout";
import CustomInput from "../../../components/common/Input/CustomInput";
import PasswordInput from "../../../components/common/Input/PasswordInput";
import CustomButton from "../../../components/common/Button/CustomButton";
import StatusMessage from "../../../components/statusMessage/StatusMessage";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [signupUser] = useSignupMutation();
  const user = useSelector(selectUser);

  const handleSignup = async (data: User) => {
    try {
      await signupUser(data).unwrap();
      if (user && user.data.user.role === "admin") {
        navigate(`${Paths.status}/createdUser`);
      } else {
        navigate(`${Paths.login}`);
      }
    } catch (err) {
      const maybeError = isErrorWithMessages(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown Error. Please try later");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title={
            user && user.data.user.role === "admin" ? "Create User" : "Sign up"
          }
          style={{ width: "30rem" }}
        >
          <StatusMessage message={error} type="error" />
          <Form onFinish={handleSignup}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="passwordConfirm"
              placeholder="Password Confirm"
            />
            <CustomButton type="primary" htmlType="submit">
              {user && user.data.user.role === "admin" ? "Create" : "Sign up"}
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            {user && user.data.user.role === "admin" ? null : (
              <Typography.Text>
                Have an account?<Link to={Paths.login}> Login</Link>
              </Typography.Text>
            )}
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Signup;
