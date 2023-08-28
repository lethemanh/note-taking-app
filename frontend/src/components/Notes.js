import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteItem from '../components/NoteItem';
import { getAllNotes } from '../apis/notes';

const Notes = props => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getNotes = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (refetch) {
      getNotes();
    }
  }, [refetch]);

  const redirectToAddNote = () => {
    navigate('/add-note');
  };

  return (
    <>
      <div className="row my-3">
        <div className="flex justify-between align-center">
          <h1>Your Notes</h1>
          <button onClick={redirectToAddNote} className="btn btn-success mb-3">
            Add Note
          </button>
        </div>

        <div className="container mx-1">
          {notes.length === 0 && <h5>No note to display</h5>}
        </div>
        {notes.map(note => {
          return (
            <NoteItem
              key={note._id}
              showAlert={props.showAlert}
              note={note}
              setRefetch={setRefetch}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
