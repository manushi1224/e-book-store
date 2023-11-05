import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';
import SignUp from './Signup';
import {useNavigate} from "react-router-dom"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); 

  const [show, setShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://manushi1224.pythonanywhere.com/api/token/', formData);
      setSuccessShow(true)
      setShow(false)
      const { access } = response.data;
      Cookies.set('jwt_token', access);
      navigate("/")
    } catch (error) {
      setSuccessShow(false)
      setShow(true)
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible show={show}>
        <div className="error-message"> Don't Have an account? <Link to='/signup' className='text-decoration-none link-text fw-bold'>Sign Up</Link></div>
      </Alert>
      <Alert variant='success' show={successShow}>
        Login Successfull!!
      </Alert>
      <div className="signIn">
        <Container className='signInModal'>
          <form onSubmit={handleSubmit}>
            <h2 align="center" className="main fw-light">Login</h2>
            <div className="modalText">
              <TextField variant="standard" label="Email" className="modalText" name="email" onChange={handleChange} required />
            </div>
            {/* <input type="email" name="email" placeholder="Email" onChange={handleChange} required /> */}
            <div className="modalText">
              <TextField id="standard" className="modalText"
                label="Password"
                type="password"
                // autoComplete="current-password"
                variant="standard" name="password" placeholder="Password" onChange={handleChange} required
              />
            </div>
            {/* <input type="password" name="password" placeholder="Password" onChange={handleChange} required /> */}
            <div className="modalText">
              <Button variant="contained" className="modalBtn text-white" type='submit'>Sign In with E-mail</Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">Don't Have an Account ?
              <Link to="/signup" element={<SignUp />} className="btnLink"> Sign Up</Link>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Login;
