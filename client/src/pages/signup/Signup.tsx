import { Row, Card, Form, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import Layout from "../../components/layout/Layout";
import CustomInput from "../../components/common/Input";
import PasswordInput from "../../components/common/Input/PasswordInput";
import CustomBotton from "../../components/common/Button";

const Signup: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <CustomBotton type="primary" htmlType="submit">
              Sign up
            </CustomBotton>
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
