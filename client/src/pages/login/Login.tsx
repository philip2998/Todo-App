import { Row, Card, Form, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import Layout from "../../components/layout/Layout";
import CustomInput from "../../components/common/Input";
import PasswordInput from "../../components/common/Input/PasswordInput";
import CustomBotton from "../../components/common/Button";

const Login: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
