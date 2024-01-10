import { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { User } from '../interfaces/User';
import { UserForm } from '../interfaces/Forms';
import { ErrorMessages, updateUserAPI } from '../services/UserService';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../contexts/GlobalContext';
import { ToastComponent } from '.';

interface UpdateUserModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateUser: (e: User) => void;
  dataSelected?: User;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isModalOpen,
  handleCloseModal,
  handleUpdateUser,
  dataSelected,
}) => {
  const { t } = useTranslation();

  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const closeToastHandle = () => setOpenToast(false);
  const openToastHandle = () => setOpenToast(true);
  const globalState = useContext(GlobalContext);
  const [changePassword, setChangePassword] = useState(false);
  const [formState, setFormState] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (dataSelected) {
      const { name, email } = dataSelected;
      setFormState({ name, email });
    }
  }, [dataSelected]);

  const cleanState = () => {
    setFormState({
      name: '',
      email: '',
      password: '',
    });
    setChangePassword(false);
  };

  const handleUpdate = async () => {
    if (dataSelected) {
      try {
        const updatedUser = await updateUserAPI(formState, dataSelected);
        handleUpdateUser(updatedUser);
        handleClose();
      } catch (e) {
        if ((e as Error).message === ErrorMessages.EMAIL_REPEATED) {
          setErrorMessage(t('users.modal_create.error_email_repeated_message'));
          openToastHandle();
          return;
        }
        setErrorMessage(t('users.modal_create.error_general_message'));
        openToastHandle();
      }
    }
  };

  const handleClose = () => {
    handleCloseModal();
    cleanState();
  };
  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <ToastComponent
        text={errorMessage}
        open={openToast}
        onClose={closeToastHandle}
      />
      <Modal.Header closeButton>
        <Modal.Title>
          {globalState?.appState.userData?.role === 'USER'
            ? t('users.modal_update.title_for_user')
            : t('users.modal_update.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>{t('users.modal_update.label_name')}: </Form.Label>
            <Form.Control
              type='text'
              readOnly={globalState?.appState.userData?.role === 'USER'}
              value={formState.name}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
              }}
              placeholder={t('users.modal_create.placeholder_name')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicRole'>
            <Form.Label>{t('users.modal_update.label_email')}: </Form.Label>
            <Form.Control
              readOnly={globalState?.appState.userData?.role === 'USER'}
              type='email'
              placeholder={t('users.modal_update.placeholder_email')}
              value={formState.email}
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
              }}
            />
          </Form.Group>
          {changePassword && (
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>
                {t('users.modal_update.label_password')}:{' '}
              </Form.Label>
              <Form.Control
                type='password'
                placeholder={t('users.modal_update.placeholder_password')}
                value={formState.password}
                onChange={(e) => {
                  setFormState({ ...formState, password: e.target.value });
                }}
              />
            </Form.Group>
          )}
          {globalState?.appState.userData?.role === 'ADMIN' && (
            <Form.Check
              type={'checkbox'}
              id={`password-check`}
              label={t('users.modal_update.password_check_button')}
              checked={changePassword}
              onChange={(e) => {
                setChangePassword(e.target.checked);
              }}
            />
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {t('users.modal_update.close_button')}
        </Button>
        {globalState?.appState.userData?.role === 'ADMIN' && (
          <Button variant='primary' onClick={handleUpdate}>
            {t('users.modal_update.save_button')}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateUserModal;
