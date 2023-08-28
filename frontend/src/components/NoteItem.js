import React from 'react';
import { useNavigate } from 'react-router-dom';
import useConfirm from '../hooks/useConfirm';
import { deleteNote } from '../apis/notes';

const NoteItem = props => {
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { note } = props;

  const viewDetail = () => {
    navigate(`/note/${note._id}`);
  };

  const handleDelete = async () => {
    try {
      props.setRefetch(false);
      const isConfirmed = await confirm('Do you want to delete this note?');

      if (isConfirmed) {
        await deleteNote(note._id);
        props.setRefetch(true);
        props.showAlert('Note deleted successfully', 'success');
      }
    } catch (error) {
      props.showAlert(error.message, 'danger');
    }
  };

  return (
    <div className="col-md-4 ">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <button onClick={viewDetail} className="btn btn-info mx-2">
            <i className="fa fa-eye"></i> View Detail
          </button>
          <button onClick={handleDelete} className="btn btn-danger mx-2">
            <i className="fa fa-trash-o"></i> Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
