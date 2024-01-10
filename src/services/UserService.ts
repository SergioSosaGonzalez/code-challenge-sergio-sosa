import { User } from '../interfaces/User';
import { FormLoginType, UserForm } from '../interfaces/Forms';
const API = 'http://localhost:5000';

export enum ErrorMessages {
  EMAIL_REPEATED = 'User already exists',
}
export const login = async (data: FormLoginType) => {
  const users = await getUsers();
  const { email, password } = data;
  const userFound = users.find((user) => user.email === email);
  if (userFound) {
    if (userFound.password === password) {
      localStorage.setItem(
        'user',
        JSON.stringify({ logged: true, userData: userFound })
      );
      return userFound;
    }
  }
};

export const getUsersAPI = async () => {
  return await getUsers();
};

export const createUserAPI = async (data: UserForm) => {
  await emailValidation(data, 'CREATE');
  const request = await fetch(`${API}/users`, {
    method: 'POST',
    body: JSON.stringify({ ...data, role: 'USER' }),
  });

  return (await request.json()) as User;
};

export const deleteUserAPI = async (id: string) => {
  await fetch(`${API}/users/${id}`, {
    method: 'DELETE',
  });
};

export const updateUserAPI = async (data: UserForm, dataSelected: User) => {
  await emailValidation(data, 'UPDATE', (users: User[]) => {
    const user = users.find((user) => user.id === dataSelected.id);
    if (!user) return false;
    return user.email === data.email;
  });

  const request = await fetch(`${API}/users/${dataSelected.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...dataSelected, ...data }),
  });

  return (await request.json()) as User;
};

const emailValidation = async (
  data: UserForm,
  action: 'CREATE' | 'UPDATE',
  UpdateEmailVerification: (users: User[]) => boolean = () => false
) => {
  const users = await getUsers();
  if (action === 'UPDATE') {
    if (UpdateEmailVerification(users)) {
      return;
    }
  }

  if (
    users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())
  ) {
    throw new Error(ErrorMessages.EMAIL_REPEATED);
  }
};

const getUsers = async () => {
  const request = await fetch(`${API}/users`);
  const users = (await request.json()) as User[];
  return users;
};
