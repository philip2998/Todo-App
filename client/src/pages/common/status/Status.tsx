import { Button, Result, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../../paths";

const Statuses: Record<string, string> = {
  created: "Item added",
  updated: "Item updated",
  deleted: "Item deleted",
};

const Status = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      navigate(`${Paths.userTodos}/${userId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Row align="middle" justify="center" className="w-100">
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Not Found"}
        extra={
          <Button key="dashboard" onClick={handleHomeClick}>
            Home
          </Button>
        }
      />
    </Row>
  );
};

export default Status;
