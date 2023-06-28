import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Todo added",
  updated: "Todo updated",
  deleted: "Todo deleted",
};

const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" className="w-100">
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Not Found"}
        extra={
          <Button key="dashboard">
            <Link to="/">Home</Link>
          </Button>
        }
      />
    </Row>
  );
};

export default Status;
