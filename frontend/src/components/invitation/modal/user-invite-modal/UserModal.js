import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Invite from './Invite';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserModal = (props) => {
    let user = props.user;

    return (
      <Modal className="invite-modal" onHide={props.onHide} show={props.show} size="lg" 
       aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className="my-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col className="cont-avatar">
                {user.username.toUpperCase()[0]}
              </Col>
              <Col>
                {user.username.toUpperCase()[0] + user.username.slice(1)}
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer className="my-modal-footer">
        {
            props.show &&
            <Invite otherUser={props.user} onHide={props.onHide} 
            group={props.group} getGroup={props.getGroup}/>
          }
        </Modal.Footer>
      </Modal>
    );
  }
  


export default UserModal;