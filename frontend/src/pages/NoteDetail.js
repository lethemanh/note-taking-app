import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNoteById } from '../apis/notes';

export const NoteDetail = props => {
  const navigate = useNavigate();
  const params = useParams();

  const [note, setNote] = useState({
    _id: '',
    title: '',
    description: '',
    tag: '',
  });

  const getNote = async () => {
    const note = await getNoteById(params.id);
    setNote(note);
  };

  useEffect(() => {
    getNote();
  }, [params.id]);

  const handleEditNote = () => {
    navigate(`/edit-note/${params.id}`);
  };

  const goBack = () => {
    navigate('/');
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
            disabled
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="add a title to your note"
            value={note.title}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            disabled
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="add a tag to your note"
            value={note.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            disabled
            placeholder="add a description to your note"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleEditNote}
          className="btn btn-warning mb-3 mx-2"
        >
          <i className="fa fa-pencil"></i> Edit Note
        </button>
        <button onClick={goBack} className="btn btn-secondary mb-3 mx-2">
          Back
        </button>
      </form>
    </div>
  );
};
