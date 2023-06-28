import { Row, Card, Form, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useState } from "react";
import { useSignupMutation } from "../../app/services/authApi";
import { User } from "../../types";
import { isErrorWithMessages } from "../../utils/isErrorWithMessages";

import Layout from "../../components/layout/Layout";
import CustomInput from "../../components/common/Input/CustomInput";
import PasswordInput from "../../components/common/Input/PasswordInput";
import CustomBotton from "../../components/common/Button/CustomButton";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

type SignupData = Omit<User, "id">;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [signupUser] = useSignupMutation();

  const signup = async (data: SignupData) => {
    try {
      console.log(data);
      await signupUser(data).unwrap();
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
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={signup}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="passwordConfirm"
              placeholder="Password Confirm"
            />
            <CustomBotton type="primary" htmlType="submit">
              Sign up
            </CustomBotton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an account?<Link to={Paths.login}> Login</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Signup;
