import React, { useState } from 'react'
import MainPage from '../../components/MainPage'
import { Button, Form } from 'react-bootstrap';
import './RegisterPage.css';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router-dom';



const RegisterPage = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords Do not Match')
    } else {
      setMessage(null)
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          { name, email, password },
          config
        );
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/login");
      } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
        
      }
    }
  }

  return (
    <MainPage title="SIGNUP">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className="text-muted">Enter your full name</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" placeholder="Upload Picture" custom />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <h5 className='loginArea'>
          Already a User?<Link to="/login"> Login </Link>
        </h5>
      </div>
    </MainPage>
  );
}

export default RegisterPage
