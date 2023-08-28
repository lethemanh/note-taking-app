import axiosInstance from '../utils/axiosInstance';

const signUp = async (name, email, password) => {
  const { data } = await axiosInstance.post(
    '/auth/sign-up',
    {
      name,
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    },
  );
  return data;
};

const login = async (email, password) => {
  const { data } = await axiosInstance.post(
    `/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    },
  );

  return data;
};

export { signUp, login };
