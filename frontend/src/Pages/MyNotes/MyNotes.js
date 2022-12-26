import React from 'react'
import MainPage from '../../components/MainPage'
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notes from '../../data/notes';

const MyNotes = () => {

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
     
    }
  };


  return (
    <MainPage title="Welcome Emmanuel Kesseh..">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion defaultActiveKey={['0']}>
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
                <footer className="blockquote-footer">Created On - date</footer>
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
