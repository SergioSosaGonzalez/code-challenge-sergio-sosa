import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ErrorMessages, createUserAPI } from '../services/UserService';
import { User } from '../interfaces/User';
import { ToastComponent } from '.';

interface CreateUserModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSavedUser: (e: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isModalOpen,
  handleCloseModal,
  handleSavedUser,
}) => {
  const { t } = useTranslation();
  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const closeToastHandle = () => setOpenToast(false);
  const openToastHandle = () => setOpenToast(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const cleanState = () => {
    setFormState({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleSave = async () => {
    try {
      const newUser = await createUserAPI(formState);
      handleSavedUser(newUser);
      handleCloseModal();
      cleanState();
    } catch (e) {
      if ((e as Error).message === ErrorMessages.EMAIL_REPEATED) {
        setErrorMessage(t('users.modal_create.error_email_repeated_message'));
        openToastHandle();
        return;
      }
      setErrorMessage(t('users.modal_create.error_general_message'));
      openToastHandle();
    }
  };

  const handleClose = () => {
    cleanState();
    handleCloseModal();
  };

  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <ToastComponent
        text={errorMessage}
        open={openToast}
        onClose={closeToastHandle}
      />
      <Modal.Header closeButton>
        <Modal.Title>{t('users.modal_create.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>{t('users.modal_create.label_name')}: </Form.Label>
            <Form.Control
              type='text'
              value={formState.name}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
              }}
              placeholder={t('users.modal_create.placeholder_name')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicRole'>
            <Form.Label>{t('users.modal_create.label_email')}: </Form.Label>
            <Form.Control
              type='email'
              placeholder={t('users.modal_create.placeholder_email')}
              value={formState.email}
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>{t('users.modal_create.label_password')}: </Form.Label>
            <Form.Control
              type='password'
              placeholder={t('users.modal_create.placeholder_password')}
              value={formState.password}
              onChange={(e) => {
                setFormState({ ...formState, password: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {t('users.modal_create.close_button')}
        </Button>
        <Button
          variant='primary'
          onClick={handleSave}
          disabled={
            !formState.email.trim() ||
            !formState.name.trim() ||
            !formState.password.trim()
          }>
          {t('users.modal_create.save_button')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateUserModal;
