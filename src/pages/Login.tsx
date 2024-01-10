import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FormLoginType } from 'src/interfaces/Forms';
import { login } from '../services/UserService';
import { GlobalContext } from '../contexts/GlobalContext';
import { ToastComponent } from '../components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const appContext = useContext(GlobalContext);
  const [openToast, setOpenToast] = useState(false);
  const [form, setForm] = useState<FormLoginType>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const openToastHandle = () => {
    setOpenToast(true);
  };
  const closeToastHandle = () => setOpenToast(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = await login(form);
    if (userData) {
      appContext?.setAppState({
        ...appContext.appState,
        logged: true,
        userData,
      });
      navigate('/users');
      return;
    }
    openToastHandle();
  };

  return (
    <>
      <ToastComponent
        text={t('login.error_message')}
        open={openToast}
        onClose={closeToastHandle}
      />
      <Container className='form-login'>
        <Form className='mt-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>{t('login.label_email')}</Form.Label>
            <Form.Control
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              type='email'
              placeholder={t('login.placeholder_email')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>{t('login.label_password')}</Form.Label>
            <Form.Control
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              type='password'
              placeholder={t('login.placeholder_password')}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default Login;
