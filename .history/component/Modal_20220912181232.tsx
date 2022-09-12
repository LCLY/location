import React, { useEffect } from "react";
import "../styles/Modal.module.scss";

/* components */
/* 3rd party lib */
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
	useEffect(() => {
		axios
			.get(
				`https://fmstest.dev2ezasia.com/api/v1/work_orders/${selectedWorkOrder.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{selectedWorkOrder.ref_no}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
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
