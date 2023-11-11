import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/logo.png';

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  };

  return (
    <Container>
      <Nav>
        <Links>
          <Link to="/">
            <img src={img} alt="logo.png" />
          </Link>
          <Link to="/" className="link">
            Home
          </Link>
          {localStorage.getItem('token') &&
          <Link to="/about" className="link">
            About
          </Link>}
        </Links>
        <>
          {!localStorage.getItem('token') ? (
            <Buttons>
              <Link to="/login" className="link bttn">
                LogIn
              </Link>
              <Link to="/signup" className="link bttn">
                SignUp
              </Link>
            </Buttons>
          ) : (
            <LogoutButton onClick={handleLogout}>LogOut</LogoutButton>
          )}
        </>
      </Nav>
    </Container>
  );
};

const Container = styled.div`
  background-color: gray;
  padding: 0.5rem 0;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
  margin: 0 auto;
`;
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .link {
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
  .link:hover {
    color: lightblue;
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .bttn {
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: bold;
    background-color: lightblue;
    padding: 5px 8px;
    border-radius: 8px;
  }
  .bttn:hover{
    background-color: lightskyblue;
    
  }
  `;
const LogoutButton = styled.div`
text-decoration: none;
color: black;
font-size: 16px;
font-weight: bold;
background-color: lightblue;
padding: 5px 8px;
border-radius: 8px;
cursor: pointer;

&:hover {
  background-color: lightskyblue;
}
`


export default Navbar;
