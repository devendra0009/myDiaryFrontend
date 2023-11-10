import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ showAlert }) => {

  const host = process.env.REACT_APP_BACKEND_URI;
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    // //  console.log(e,e.target,e.target[3],e.target[3].value);
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
        history('/');
        showAlert('success', 'SuccessFully Created Your Account!');
      } else {
        showAlert('success', 'Enter Valid Credentials');
      }
    } else {
      alert('Enter correct PassWord');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container ">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
