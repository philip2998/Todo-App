import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { Todo } from "../../../types";

import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import Modal from "../../../components/common/Modal/Modal";

type TodoTableProps = {
  data: Todo[] | undefined;
  isLoading: boolean;
  modalTitle: string;
  modalButtonText: string;
  isModalOpen: boolean;
  modalComponent: JSX.Element | null;
  showModal: (
    title: string,
    btnText: string,
    component: JSX.Element | null
  ) => void;
  hideModal: () => void;
};

const TodoTable = ({
  data,
  isLoading,
  showModal,
  hideModal,
  modalTitle,
  modalButtonText,
  modalComponent,
  isModalOpen,
}: TodoTableProps) => {
  const columns: ColumnsType<Todo> = [
    {
      title: <span className="table-column-title">Title</span>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <span className="table-column-title">Description</span>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <span className="table-column-title">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditFilled />}
            onClick={() =>
              showModal("Edit Todo", "Edit", <EditTodo todoId={record._id} />)
            }
          />
          <Button
            type="link"
            danger
            icon={<DeleteFilled />}
            onClick={() =>
              showModal(
                "Delete Todo",
                "Delete",
                <DeleteTodo todoId={record._id} />
              )
            }
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        columns={columns}
        rowKey={(record) => record._id}
      />
      <Modal
        title={modalTitle}
        btnText={modalButtonText}
        show={isModalOpen}
        close={hideModal}
        children={modalComponent}
      />
    </>
  );
};

export default TodoTable;
