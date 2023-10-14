import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import "../style/SignUp.css"
import {useNavigate} from "react-router-dom"

function SignUp() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [show, setShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the specific error when the user modifies the corresponding field
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: '',
      password: '',
      general: '',
    });

    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      setSuccessShow(true)
      setShow(false)
      console.log('User registered:', response.data);
      navigate('/login')
      // Redirect or perform some action after successful registration
    } catch (error) {
      setSuccessShow(false)
      setShow(true)
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;

        if (errorMessages.includes(`[&#x27;choose another password, min 8 characters&#x27;]`)) {
          setErrors({ email: 'choose another password, min 8 characters' });
        }
        if (errorMessages.includes(`[&#x27;choose another email&#x27;]`)) {
          setErrors({ password: 'choose another email' });
        }
      } else {
        // Handle other errors
        setErrors({ ...errors, general: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible show={show}>
        {errors.email && <div className="error-message">{errors.email}</div>}
        {errors.password && <div className="error-message">There is already an account associated with {formData.email}. Try to Log In!</div>}
      </Alert>
      <Alert variant='success' show={successShow}>
        Your account is created successfully !
      </Alert>
      <div className="signIn">
        <Container className="signInModal">
          <form onSubmit={handleSubmit}>
            <h1 align="center" className="main fw-light">Sign Up</h1>
            <div className="modalText">
              <TextField variant="standard" label="Username" className="modalText" name='username' onChange={handleChange} required />
            </div>
            <div className="modalText">
              <TextField variant="standard" label="Email" className="modalText" name='email' onChange={handleChange} required />
            </div>
            <div className="modalText">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                name='password' onChange={handleChange} className="modalText" required />
            </div>
            <div className="modalText">
              <Button variant='contained' type='submit' className='modalBtn text-white'>Sign Up with E-mail</Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">Already have an account ?
              <Link to="/login" className="btnLink"> Sign In</Link>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;