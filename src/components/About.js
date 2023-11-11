import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import styled from 'styled-components';

const About = () => {
  const context = useContext(noteContext);
  const { userDetails, fetchUser } = context;
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Container>
    <UserCard>
      {userDetails ? (
        <div>
          Your Name: {userDetails.name}
          <br/>
          Your Email: {userDetails.email}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      </UserCard>
    </Container>
  );
};
const Container=styled.div`
max-width: 80vw;
margin: 0 auto;
`
const UserCard=styled.div`
text-align: center;
font-size: larger;
font-weight: bold;
padding: 1rem 0;
border-radius: 0 0px 8px 8px;
background-color: lightskyblue;
`


export default About;
