import React from "react";
import "../styles/Modal.module.scss";
/* components */
/* 3rd party lib */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/* Util */
interface ModalProps {
	selectedWorkOrder: any;
}

type Props = ModalProps;

const ModalComponent: React.FC<Props> = ({ selectedWorkOrder }) => {
	console.log(modalTarget, selectedWorkOrder);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalComponent;
