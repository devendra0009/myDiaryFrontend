import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import styled from 'styled-components';

const AddNote = ({ showAlert }) => {
  const context = useContext(noteContext); //to use addNote function from contextApi
  const { addNote } = context;

  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //means jo note me h vo to likh hi de or baki jo bhi ara hai use overwrite krde
    //e.target.name ki value me inputted value rkhde
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    showAlert('success', 'Note Added SuccessFully!!');
  };

  return (
    <Container>
      <Main>
        <h2 className="heading">Add a Note</h2>
        <Form>
          <FormInput>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Input
              type="text"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <Input
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </FormInput>
          <Button
            disabled={note.title.length < 3 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
          >
            Add Note
          </Button>
        </Form>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  background-color: whitesmoke;
`;

const Main = styled.div`
  max-width: 80vw;
  padding: 20px; /* Add some padding for better visual appearance */
  padding-top: 0;
  .heading {
    padding: 6px 9px;
    font-size: 2rem;
    font-weight: bold;
    /* padding-left: 8px; */
  }
  .heading:hover {
    background-color: lightskyblue;
    padding: 5px 8px;
    border: 1px solid blueviolet;
    border-radius: 8px;
  }
`;

const Form = styled.form`
  margin-top: 20px; /* Add some top margin to the form */
`;

const FormInput = styled.div``;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid gray;
  margin-bottom: 10px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? 'gray' : 'darkblue')};
  }
`;

export default AddNote;
