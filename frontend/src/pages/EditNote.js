import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editNote, getNoteById } from '../apis/notes';

export const EditNote = props => {
  const navigate = useNavigate();
  const params = useParams();

  const [note, setNote] = useState({
    _id: '',
    title: '',
    description: '',
    tag: '',
  });

  const getNote = async () => {
    const noteData = await getNoteById(params.id);
    setNote(noteData);
  };

  useEffect(() => {
    getNote();
  }, [params.id]);

  const handleEdit = async e => {
    e.preventDefault();
    try {
      await editNote(note._id, note.title, note.description, note.tag);
      props.showAlert('Note edited successfully', 'success');
      navigate('/');
    } catch (error) {
      props.showAlert(error.message, 'success');
    }
  };

  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(`/note/${params.id}`);
  };

  return (
    <div className="container my-3">
      <h1 className=" my-3">Edit Note</h1>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="add a title to your note"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="add a tag to your note"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            placeholder="add a description to your note"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            rows="3"
          ></textarea>
        </div>
        <button
          disabled={
            note.title.length < 2 ||
            note.description.length < 5 ||
            note.tag.length < 2
          }
          type="submit"
          onClick={handleEdit}
          className="btn btn-success mb-3 mx-2"
        >
          Edit Note
        </button>
        <button onClick={goBack} className="btn btn-secondary mb-3 mx-2">
          Back
        </button>
      </form>
    </div>
  );
};
