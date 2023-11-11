import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import styled from 'styled-components';

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });

  let history = useNavigate(); //to navigate user to login page if he hasn't
  let ref = useRef(null); //this will bind the modal to the update button click
  let refClose = useRef(null); //this will bind the update button to close so that after clicking update button the modal should also close

  useEffect(() => {
    //agr localstorage me token null nhi hai to sareNotes laja us yser k nhi to login page dikha
    if (localStorage.getItem('token')) {
      fetchNotes();
    } else {
      history('/login');
    }
    //eslint-disable-next-line
  }, []);

  const updateNote = (currNote) => {
    //currNote me hm note pass krre hai which is clicked
    // //  console.log("Editin...");
    // //  console.log(currNote);
    ref.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    }); //so that inititally jo bhi added note me value hai vo ajae
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    // //  console.log("updating...", note); //this will be the updated note
    editNote(note.id, note.etitle, note.edescription, note.etag); //edited title, edited tag,....
    refClose.current.click();
    showAlert('success', 'Notes Updated!!');
  };

  return (
    <Container>
      {/* Component to add a note */}
      <Form>
        <AddNote showAlert={showAlert} />
      </Form>
      {/* Modal to updateNote */}
      {/* now to refer it we use useRef hook so that on triggering of updateNote function, we can show this modal, and when will updateNote func run??-> on clciking pencil button kep on noteItem */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Display none
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* To show all the notes fetched by mapping over the notes array coming as a context */}
      <AllNotes>
        <span className="heading">Your Notes</span>
        <div>{notes.length === 0 && 'No Notes to Display'}</div>
        <div className="your_notes">
          {notes.map((note, index) => {
            return (
              <NoteItem
                key={note._id}
                note={note}
                updateNote={updateNote}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      </AllNotes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 80vw;
  margin: 0 auto;
  background-color: whitesmoke;
  padding: 1rem;
  gap: 2rem;

  @media (max-width: 999px) {
    flex-direction: column;
  }
`;
const Form = styled.div`
  width: 30%;
  border-right: 1px solid gray;
  @media (max-width: 999px) {
    width: 100%;
    border-right: 0;
  }
`;
const AllNotes = styled.div`
  width: 70%;
  .heading {
    font-size: 2rem;
    font-weight: bold;
    padding: 6px 9px;
  }
  .heading:hover {
    background-color: lightskyblue;
    padding: 5px 8px;
    border: 1px solid blueviolet;
    border-radius: 8px;
  }
  .your_notes {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    /* grid-template-rows: auto; */

    @media (max-width: 640px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 415px) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 999px) {
    width: 100%;
  }
`;

export default Notes;
