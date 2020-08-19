import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function App() {
  const [itemCount, setItemCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeItemList, setActiveItemList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [show, setShow] = useState(false);
  const [newInput, setNewInput] = useState('');
  
  const [rerender, setRerender] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddNew = () => {
    let arr = activeItemList;
    arr.push(newInput)
    setItemCount(itemCount + 1)
    setActiveItemList(arr)
    console.log(activeItemList)
    handleClose()
  }

  const handleComplete = (index) => {
    const clicked = activeItemList[index]

    setCompletedCount(completedCount + 1);

    let newArr = completedList
    newArr.push(clicked)
    setCompletedList(newArr)

    let activeArr = activeItemList
    activeArr.pop(clicked)
    setActiveItemList(activeArr)


    rerender ? setRerender(false) : setRerender(true)
    
    console.log(activeItemList)

  }

  return (
    <>
      <Container fluid id="main-container">
        <Row>
          <Col className="main-cols">
            <h2>status col</h2>
            <Card>
              <Card.Header>Stats</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Items Added This Session: {itemCount} </ListGroup.Item>
                <ListGroup.Item>Items Completed This Session: {completedCount} </ListGroup.Item>
                <ListGroup.Item>Active Items: {activeItemList.length} </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col className="main-cols">
            <h2>Active Items Col</h2>
            <Button
              variant="primary"
              onClick={handleShow}
              >
              Add New
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Item: </Form.Label>
                    <Form.Control type="text" placeholder="To-do Item" value={newInput} onChange={(e) => setNewInput(e.target.value)} />
                  </Form.Group>
                </Form>
              
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddNew}>
                  Add New
                </Button>
              </Modal.Footer>
            </Modal>

            {
              activeItemList.map((item, index) => {
                return <h4 key={index}>{item}
                  <Button
                  variant="success" 
                  // onClick={handleComplete(index)}
                  onClick={() => {
                    handleComplete(index)
                  
                  }}
                  >
                    Complete
                  </Button>
                </h4>
              })
            }


          </Col>
          <Col className="main-cols"> 
            <h2>Completed this session Col</h2>

            {
              completedList.map((item, index) => {
                return <h4 key={index}>{item}
                  
                </h4>
              })
            }

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
