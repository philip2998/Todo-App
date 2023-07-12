import { Modal as BootstrapModal, Button } from "react-bootstrap";

type ModalProps = {
  children: JSX.Element | null;
  title: string;
  btnText: string;
  show: boolean | undefined;
  close: () => void;
};

const Modal = ({ children, title, show, close }: ModalProps) => {
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
          <Button variant="primary" onClick={close}>
            Close
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
