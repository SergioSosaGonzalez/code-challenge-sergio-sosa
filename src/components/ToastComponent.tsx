import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastComponentProps {
  text: string;
  open: boolean;
  type?: string;
  onClose: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  open,
  onClose,
  text,
}) => {
  return (
    <ToastContainer position='top-center'>
      <Toast
        show={open}
        className='error'
        onClose={onClose}
        delay={2000}
        bg='danger'
        autohide>
        <Toast.Body className='text-white'>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastComponent;
