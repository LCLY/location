import React from "react";
import "../styles/Modal.module.scss";

/* components */
/* 3rd party lib */
import { Button, Form, Modal } from "react-bootstrap";

/* Util */
interface ModalProps {
	show: boolean;
	selectedWorkOrder: any;
	handleClose: () => any;
}

type Props = ModalProps;

const ModalComponent: React.FC<Props> = ({
	show,
	selectedWorkOrder,
	handleClose,
}) => {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{selectedWorkOrder.ref_no}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ marginBottom: "10px" }}>Change Job Status</div>

					<Form.Select aria-label='Default select example'>
						<option>Open this select menu</option>
						<option value='1'>One</option>
						<option value='2'>Two</option>
						<option value='3'>Three</option>
					</Form.Select>
				</Modal.Body>
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
