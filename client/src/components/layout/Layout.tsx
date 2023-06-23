import { Layout as AntLayout } from "antd";
import Header from "../header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-75 h-100 mx-auto">
      <Header />
      <AntLayout.Content className="h-100">{children}</AntLayout.Content>
    </div>
  );
};

export default Layout;
