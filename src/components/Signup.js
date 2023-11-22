import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = ({ showAlert }) => {

  const host = process.env.REACT_APP_BACKEND_URI;
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [loading,setLoading]=useState(false);
  let history = useNavigate();

  const handleSubmit = async (e) => {
    // //  console.log(e,e.target,e.target[3],e.target[3].value);
    setLoading(true)
    e.preventDefault();
    const { name, email, password } = credentials;

    if (password === e.target[3].value) {
      const response = await fetch(
          `${host}/api/auth/createuser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const token = await response.json();
      //  console.log(token);
      if (token.success) {
        localStorage.setItem('token', token.authToken);
        setLoading(false)
        history('/');
        showAlert('success', 'SuccessFully Created Your Account!');
      } else {
        setLoading(false)
        showAlert('success', 'Enter Valid Credentials');
      }
    } else {
      setLoading(false)
      alert('Enter correct PassWord');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Main>
        <h2 className="heading">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <FormInput>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter Name"
            />
          </FormInput>
          <FormInput>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </FormInput>
          <FormInput>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
              minLength={5}
              required
            />
          </FormInput>
          <FormInput>
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <Input
              type="password"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </FormInput>
          <Button type="submit">{loading?'Registering In...':'Register'}</Button>
        </Form>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  background-color: whitesmoke;
  .heading{
    font-weight: bold;
  }
`;

const Main = styled.div`
  max-width: 40vw;
  padding: 20px;
  margin: 0 auto;
  @media (max-width: 999px) {
    max-width: 60vw;
  }
  @media (max-width: 600px) {
    max-width: 80vw;
  }
`;

const Form = styled.form`
  margin-top: 20px;
`;

const FormInput = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid gray;
  margin-bottom: 10px;
  outline: none;

  &:focus {
    outline: none;
    border: 1px solid dodgerblue;
  }
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

export default Signup;
