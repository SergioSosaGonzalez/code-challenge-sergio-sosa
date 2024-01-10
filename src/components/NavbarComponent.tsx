import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

const NavbarComponent = () => {
  const { i18n, t } = useTranslation();
  const globalState = useContext(GlobalContext);
  const logOut = () => {
    localStorage.removeItem('user');
    globalState?.setAppState({
      logged: false,
    });
  };
  return (
    <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>SPA Code Challenge</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-end'>
          <Nav className='mr-auto d-flex'>
            <NavDropdown
              title={t('navbar.user_text')}
              id='collapsible-nav-dropdown'>
              {globalState?.appState.logged ? (
                <>
                  <Link to='/users' className='dropdown-item'>
                    {t('navbar.user_text')}
                  </Link>
                  <NavDropdown.Item onClick={logOut}>
                    {t('navbar.logout_text')}
                  </NavDropdown.Item>
                </>
              ) : (
                <Link to='/login' className='dropdown-item'>
                  {t('navbar.login_text')}
                </Link>
              )}
            </NavDropdown>
            <NavDropdown
              title={t('navbar.lenguages_text')}
              id='collapsible-nav-dropdown2'>
              <NavDropdown.Item
                active={i18n.language === 'en'}
                onClick={() => {
                  i18n.changeLanguage('en');
                }}>
                EN
              </NavDropdown.Item>
              <NavDropdown.Item
                active={i18n.language === 'es'}
                onClick={() => {
                  i18n.changeLanguage('es');
                }}>
                ES
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
