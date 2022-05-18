import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

const ModalSmall = ({smShow, setSmShow}) => {

    return(
        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
           <p><strong>Thank you for participating!</strong> </p>
           <p><strong>Then you will be redirected to the beginning</strong> </p>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    )
}

export default ModalSmall;