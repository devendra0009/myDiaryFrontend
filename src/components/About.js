import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';

const About = () => {
  const context = useContext(noteContext);
  const { userDetails, fetchUser } = context;
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {userDetails ? (
        <div>
          Your Name: {userDetails.name}
          <br/>
          Your Email: {userDetails.email}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default About;
