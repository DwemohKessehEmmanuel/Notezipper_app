import React, { useEffect } from 'react'
import MainPage from '../../components/MainPage'
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({search}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const noteList = useSelector(state => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

   const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;



  // console.log(notes)
  
  
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, successCreate, userInfo, successUpdate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id))
     
    }
  };


  return (
    <MainPage title= {`Welcome ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant='danger'>{ errorDelete}</ErrorMessage>}
      {loadingDelete  && <Loading/>}
      {notes?.reverse()
        .filter(filteredNote => (
        filteredNote.title.toLowerCase().includes(search.toLowerCase())
        ))
        .map((note) => (
        <Accordion defaultActiveKey={['0']} key={note._id}>
         <Accordion.Item >
          <Card style={{margin:10}}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "white",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
               <Accordion.Button as={Card.Text} variant='link'>{note.title}</Accordion.Button>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse>
              <Card.Body>
              <h4>
                    <Badge bg="success" text='light'>Category - {note.category}{""}</Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created On{""}
                      <cite title="Source Title">
                        {note.createdAt.substring(0,10)}
                      </cite>
                    </footer>
              </blockquote>
            </Card.Body>
                </Accordion.Collapse>
              
           
            
          </Card>
         </Accordion.Item>
          
        </Accordion>
      ))}
    </MainPage>
  );
}

export default MyNotes
