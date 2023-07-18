import {
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

import CustomButton from "../common/Button/CustomButton";

type AdminButtonsProps = {
  showModal: () => void;
};

const AdminButtons = ({ showModal }: AdminButtonsProps) => {
  const navigate = useNavigate();

  const adminButtons = [
    {
      text: "All Users",
      icon: <UserOutlined />,
      onClick: () => navigate(Paths.allUsers),
    },
    {
      text: "All Todos",
      icon: <UnorderedListOutlined />,
      onClick: () => navigate(Paths.allTodos),
    },
    {
      text: "Create User",
      icon: <UserAddOutlined />,
      onClick: showModal,
    },
  ];

  return (
    <>
      {adminButtons.map((button, index) => (
        <CustomButton
          key={index}
          type="primary"
          onClick={button.onClick}
          icon={button.icon}
          className="ms-2"
        >
          {button.text}
        </CustomButton>
      ))}
    </>
  );
};

export default AdminButtons;
