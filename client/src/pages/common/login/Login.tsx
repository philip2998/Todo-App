import { Row, Card, Form, Space, Typography, Button } from "antd";
import { isErrorWithMessages } from "../../../utils/isErrorWithMessages";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../app/services/authApi";
import { useState } from "react";
import { Paths } from "../../../paths";
import { User } from "../../../types";

import ForgotPassword from "./forgotPassword/ForgotPassword";
import StatusMessage from "../../../components/statusMessage/StatusMessage";
import PasswordInput from "../../../components/common/Input/PasswordInput";
import CustomButton from "../../../components/common/Button/CustomButton";
import CustomInput from "../../../components/common/Input/CustomInput";
import Layout from "../../../components/layout/Layout";
import Modal from "../../../components/common/Modal/Modal";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

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

  const showModal = (
    title: string,
    buttonText: string,
    component: JSX.Element | null
  ) => {
    setModalTitle(title);
    setModalButtonText(buttonText);
    setModalComponent(component);
    setIsModalOpen(true);
  };
  const hideModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: "30rem" }}>
          <StatusMessage message={error} type="error" />
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
            <Typography.Text>
              <Button
                type="link"
                onClick={() =>
                  showModal("Forgotten Password", "Submit", <ForgotPassword />)
                }
              >
                Forgotten Password?
              </Button>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
      <Modal
        title={modalTitle}
        btnText={modalButtonText}
        show={isModalOpen}
        close={hideModal}
        children={modalComponent}
      />
    </Layout>
  );
};

export default Login;
