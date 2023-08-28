import axiosInstance from '../utils/axiosInstance';

const getAllNotes = async () => {
  const { data } = await axiosInstance.get('/notes', {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
    },
  });
  return data;
};

const getNoteById = async id => {
  const { data } = await axiosInstance.get(`/notes/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
    },
  });

  return data;
};

const addNote = async (title, description, tag) => {
  const response = await axiosInstance.post(
    `/notes/`,
    { title, tag, description },
    {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    },
  );
  return response;
};

const editNote = async (id, title, description, tag) => {
  const response = await axiosInstance.put(
    `/notes/${id}`,
    { title, tag, description },
    {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    },
  );
  return response;
};

const deleteNote = async id => {
  const response = await axiosInstance.delete(`/notes/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
    },
  });
  return response;
};

export { getAllNotes, getNoteById, addNote, editNote, deleteNote };
