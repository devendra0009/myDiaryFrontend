import React, { useState } from 'react';
import NoteContext from './NoteContext';

//defining states here that we want to use anywhere directly

const NoteStates = (props) => {
  const host = process.env.REACT_APP_BACKEND_URI;
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial); //so as to add or delete note from notes array
  const [userDetails, setUserDetails] = useState({});

  const fetchUser = async () => {
    const response = await fetch(`${host}/api/users/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const user = await response.json(); //yha json me mjhe new notes vala array milra hoga by fetch all notes request
    console.log(user);
    setUserDetails(user);
  };

  //Fetch notes
  const fetchNotes = async () => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const note = await response.json(); //yha json me mjhe new notes vala array milra hoga by fetch all notes request
    // console.log(note);
    setNotes(note);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    console.log('adding a note');

    //Api Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      //body me inputted title description and tag daldia or post krdia in database
    });

    const note = await response.json();
    // console.log(notes);
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    console.log('deleting...' + id);

    //Api Call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    await response.json();
    // console.log(json);

    //use filter method to remove the note with the id passed
    const newNotes = notes.filter((note) => note._id !== id); //so filter method pure notes array ko traverse krega or jin-jin note ki id not equal hai id given k un-unko ek array me dalkr vo array return krdega or hm us array ko setNotes me daldege
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    await response.json();
    // console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)); //make a deep copy of notes object
    //updation
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          notes,
          addNote,
          deleteNote,
          editNote,
          fetchNotes,
          userDetails,
          fetchUser,
        }}
      >
        {/* NoteContext k andr jo koi bhi hoga vo access krpaega 'value' ko */}
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteStates;
