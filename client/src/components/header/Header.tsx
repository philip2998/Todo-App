import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import CustomBotton from "../common/Button/CustomButton";

const Header: React.FC = () => {
  return (
    <Layout.Header className="py-4 px-0 d-flex align-items-center justify-content-between mb-3 text-light">
      <Space>
        <TeamOutlined className="fs-2 me-2" />
        <Link to={Paths.home}>
          <CustomBotton type="ghost">
            <Typography.Title level={1}>ToDo App</Typography.Title>
          </CustomBotton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.signup}>
          <CustomBotton type="ghost" icon={<UserOutlined />}>
            Signup
          </CustomBotton>
        </Link>
        <Link to={Paths.login}>
          <CustomBotton type="ghost" icon={<LoginOutlined />}>
            Login
          </CustomBotton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

export default Header;
