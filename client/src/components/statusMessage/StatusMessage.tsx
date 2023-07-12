import { Alert } from "antd";

type StatusMessageProps = {
  type: "error" | "success" | "info" | "warning" | undefined;
  message?: string;
};

const StatusMessage = ({ message, type }: StatusMessageProps) => {
  if (!message) {
    return null;
  }
  return <Alert message={message} type={type} className="mb-3" />;
};

export default StatusMessage;
