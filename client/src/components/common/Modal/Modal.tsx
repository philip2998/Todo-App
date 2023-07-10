import { Todo, UserData } from "../../../types";
import { MouseEventHandler } from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";

type ModalProps<T> = {
  children: JSX.Element | string;
  title: string;
  btnText: string;
  show: boolean | undefined;
  close: () => void;
  handleFunctionality: (values: T) => Promise<void>;
};

const Modal = <T extends Todo | UserData>({
  children,
  title,
  btnText,
  show,
  close,
  handleFunctionality,
}: ModalProps<T>) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const values = event.currentTarget.value as unknown as T;
    await handleFunctionality(values);
  };

  return (
    <>
      <BootstrapModal show={show} onHide={close}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title className="text-dark">
            {title}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body className="text-dark">
          {children}
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {btnText}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
