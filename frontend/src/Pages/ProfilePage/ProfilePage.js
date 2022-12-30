import React, { useEffect, useState } from 'react'
import MainPage from '../../components/MainPage'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { updateProfile } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';

const ProfilePage = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

     useEffect(() => {
       if (!userInfo) {
         navigate("/");
       } else {
         setName(userInfo.name);
         setEmail(userInfo.email);
         setPic(userInfo.pic);
       }
     }, [ userInfo]);

   
     const submitHandler = (e) => {
       e.preventDefault();

         if(password === confirmPassword)
       dispatch(updateProfile({ name, email, password}));
     };


    return (
      <MainPage title="EDIT PROFILE">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                
                <Button type="submit" varient="primary">
                  Update
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={pic} alt={name} className="profilePic" />
            </Col>
          </Row>
        </div>
      </MainPage>
    );
}

export default ProfilePage
