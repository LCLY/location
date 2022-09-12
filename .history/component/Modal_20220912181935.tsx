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
	let options = [
		{ value: "request_created", label: "Request Created" },
		{ value: "new", label: "New" },
		{ value: "en_route", label: "En Route" },
		{ value: "in_progress", label: "In Progress" },
		{ value: "closed", label: "Closed" },
		{ value: "on_hold", label: "On Hold" },
		{ value: "cancelled", label: "Cancelled" },
		{ value: "done", label: "Done" },
	];

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{selectedWorkOrder.ref_no}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ marginBottom: "10px" }}>Change Job Status</div>

					<Form.Select aria-label='Default select example'>
						{options.map((child) => (
							<option value='1'>One</option>
						))}
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
