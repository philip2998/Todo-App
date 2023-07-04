import {
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
import { PersonFillGear } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

import CustomBotton from "../common/Button/CustomButton";

const Header: React.FC = () => {
  const [userName, setUserName] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserName(`${user.data.user.name}'s Todos`);
    } else {
      setUserName("Todo App");
    }
  }, [user]);

  const handleLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Layout.Header className="py-4 px-0 d-flex align-items-center justify-content-between mb-3 text-light">
      <Space>
        <TeamOutlined className="fs-2 me-2" />
        <Link to={Paths.home}>
          <CustomBotton type="ghost">
            <Typography.Title level={1}>{userName}</Typography.Title>
          </CustomBotton>
        </Link>
      </Space>
      {user ? (
        <div>
          <CustomBotton
            type="ghost"
            icon={<LogoutOutlined />}
            onClick={handleLogoutClick}
          >
            Log Out
          </CustomBotton>
          <CustomBotton
            type="ghost"
            onClick={() => navigate(`${Paths.user}/${user.data.user.id}`)}
          >
            <PersonFillGear size={30} />
          </CustomBotton>
        </div>
      ) : (
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
      )}
    </Layout.Header>
  );
};

export default Header;
