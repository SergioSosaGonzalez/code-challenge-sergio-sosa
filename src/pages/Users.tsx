import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { deleteUserAPI, getUsersAPI } from '../services/UserService';
import { User } from '../interfaces/User';
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import CreateUserModal from '@components/CreateUserModal';
import UpdateUserModal from '@components/UpdateUserModal';
import { useTranslation } from 'react-i18next';

function Users() {
  const { t } = useTranslation();
  const globalState = useContext(GlobalContext);

  const [users, setUsers] = useState<User[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCloseCreateUserModal = () => setIsCreateModalOpen(false);
  const handleOpenCreateUserModal = () => setIsCreateModalOpen(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User>();

  const handleCloseUpdateUserModal = () => setIsUpdateModalOpen(false);
  const handleOpenUpdateUserModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    const getData = async () => {
      const usersRequested = (await getUsersAPI()).filter(
        (user) => user.id !== globalState?.appState?.userData?.id
      );

      setUsers(usersRequested);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState]);

  const handleSavedUser = async (newUser: User) => {
    setUsers((prevState) => [...prevState, newUser]);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUserAPI(id);
    setUsers((prevState) => prevState.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className='text-end mt-4'>
        {globalState?.appState.userData?.role === 'ADMIN' && (
          <Button onClick={handleOpenCreateUserModal} variant='primary'>
            {t('users.create_user_button_text')}
          </Button>
        )}
      </div>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>{t('users.table_column_name_text')}</th>
            <th>Rol</th>
            <th>{t('users.table_column_email_text')}</th>
            <th>{t('users.table_column_action_text')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, role, email, password }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{role}</td>
              <td>{email}</td>
              <td>
                <ButtonGroup aria-label='Basic example'>
                  <Button
                    variant='warning'
                    onClick={() => {
                      setUserToUpdate({ id, name, email, role, password });
                      handleOpenUpdateUserModal();
                    }}>
                    {globalState?.appState.userData?.role === 'ADMIN' ? (
                      <>{t('users.table_action_update_button')}</>
                    ) : (
                      <>{t('users.table_action_see_button')}</>
                    )}
                  </Button>
                  {globalState?.appState.userData?.role === 'ADMIN' && (
                    <Button
                      variant='danger'
                      onClick={() => handleDeleteUser(id)}>
                      {t('users.table_action_delete_button')}
                    </Button>
                  )}
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateUserModal
        isModalOpen={isCreateModalOpen}
        handleCloseModal={handleCloseCreateUserModal}
        handleSavedUser={handleSavedUser}
      />
      <UpdateUserModal
        isModalOpen={isUpdateModalOpen}
        handleCloseModal={handleCloseUpdateUserModal}
        handleUpdateUser={handleUpdateUser}
        dataSelected={userToUpdate}
      />
    </>
  );
}

export default Users;
