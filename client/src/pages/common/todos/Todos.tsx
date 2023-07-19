import { useNavigate, useParams } from "react-router-dom";
import { useGetUserTodosQuery } from "../../../app/services/todosApi";
import { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";

import CustomButton from "../../../components/common/Button/CustomButton";
import AdminButtons from "../../../components/adminButtons/AdminButtons";
import TodoTable from "./TodoTable";
import AddTodo from "./AddTodo";
import Layout from "../../../components/layout/Layout";
import Signup from "../signup/Signup";

const Todos = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const currentUser = useSelector(selectUser);
  const { data, isLoading } = useGetUserTodosQuery(id || "");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    if (currentUser?.data.user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
      <div className="d-flex mb-2">
        <CustomButton
          type="primary"
          onClick={() => showModal("Add Todo", "Add", <AddTodo />)}
          icon={<PlusCircleOutlined />}
          className="ms-2"
        >
          Add Todo
        </CustomButton>
        {isAdmin && (
          <AdminButtons
            showModal={() => showModal("Create User", "Create", <Signup />)}
          />
        )}
      </div>
      <TodoTable
        data={data}
        isLoading={isLoading}
        modalTitle={modalTitle}
        modalButtonText={modalButtonText}
        isModalOpen={isModalOpen}
        modalComponent={modalComponent}
        showModal={showModal}
        hideModal={hideModal}
      />
    </Layout>
  );
};

export default Todos;
