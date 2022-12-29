import React, { useEffect, useState } from 'react'
import MainPage from '../../components/MainPage'
import { Button, Form } from 'react-bootstrap';
import './LoginPage.css';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    dispatch(login(email,password))
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes')
    }
      
    }, [userInfo]);

    
  return (
    <MainPage title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
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
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <h5 className='signupArea'>
          Not a User?<Link to="/register"> Signup </Link>
        </h5>
      </div>
    </MainPage>
  );
}

export default LoginPage
