import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import styled from 'styled-components';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';

const NoteItem = ({ note, updateNote, showAlert }) => {
  const context = useContext(noteContext); //to use delete and editNote function from contextApi
  const { deleteNote } = context;

  return (
    <Card>
        <h5 className='title'>{note.title.toUpperCase()}</h5>
        <h6 className='desc'>{note.description}</h6>
        <span className='tag'>#{note.tag}</span>
        <Icons>
          {/* <input type="checkbox" value="" id="flexCheckDefault" />
          <label htmlFor="flexCheckDefault">Done Task</label> */}
          <AiTwotoneEdit
            onClick={() => {
              updateNote(note);
            }}
            size={25}
            style={{cursor:"pointer"}}
          />
          <AiFillDelete
            onClick={() => {
              deleteNote(note._id);
              showAlert('success', 'Note Deleted SuccessFully!!');
            }}
            size={25}
            className='dlt'
            style={{cursor:"pointer"}}
          />
        </Icons>
    </Card>
  );
};

const Card = styled.div`
  background-color: lightskyblue;
  overflow-x: scroll;
  padding: 12px 15px;
  border: 1px solid blueviolet;
  border-radius: 8px;
  transition: transform 0.1s ease;
  .title{

  }
  .tag{
    /* font-size: 14px; */
    background-color:lightgreen;
    padding: 1px ;
    border-radius: 4px;
    border: 1px solid green;
    /* font-weight: normal; */
  }
  &:hover{
    transform: scale(1.04,1.04);
    /* transform: scaleY(110%); */
  }
`;
const Icons=styled.div`
margin-top: 1rem;
display: flex;
justify-content: space-between;
`

export default NoteItem;
