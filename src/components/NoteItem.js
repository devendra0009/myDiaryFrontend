import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = ({ note, updateNote, showAlert }) => {
  const context = useContext(noteContext); //to use delete and editNote function from contextApi
  const { deleteNote } = context;

  return (
    <div className="card mx-2 my-2" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <p className="card-text">{note.tag}</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Done Task
          </label>
          <i
            className="fas fa-solid fa-trash mx-3"
            onClick={() => {
              deleteNote(note._id);
              showAlert('success', 'Note Deleted SuccessFully!!');
            }}
          ></i>
          <i
            className="fas fa-edit  mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
