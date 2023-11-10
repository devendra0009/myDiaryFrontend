import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Swithc has been replaced with route
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteStates from './context/notes/NoteStates';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState({ type: '', message: '' });
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 2500);
  };
  return (
    <>
      {/* Abhi NoteStates k andr home and about hai to m vha pr value={state} vake state ko use krskta directly */}
      <NoteStates>
        <Router>
          <Navbar />
          {alert.type !== '' && <Alert alert={alert} />}
          <div className="container">
            {/* use the same sytax given below bhot searching hogy iske chkkr me */}
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteStates>
    </>
  );
}

export default App;
