import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const host = process.env.REACT_APP_BACKEND_URI;

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading,setLoading]=useState(false);
  let history = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const token = await response.json();
    //  console.log(token);

    if (token.success) {
      //saving token in localStorage so that it can be used to authenticate users and their notes
      localStorage.setItem('token', token.authToken);
      showAlert('success', 'SuccessFully Signed In!');
      setLoading(false);
      history('/');
    } else {
      setLoading(false);
      showAlert('danger', 'Please Enter Valid Credentials!');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Main>
        <h2 className="heading">Login</h2>
        <Form onSubmit={handleSubmit}>
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
            />
          </FormInput>
          <Button type="submit">{loading?'Logging In...':'Login'}</Button>
        </Form>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  background-color: whitesmoke;
  .heading {
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
    border: 1px solid dodgerblue; /* Change border color on focus */
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

export default Login;
