import React from "react";
import "./Modal.module.scss";
/* components */
/* 3rd party lib */
/* Util */
interface ModalProps {}

type Props = ModalProps;

const Modal: React.FC<Props> = () => {
	return (
		<>
			<button
				type='button'
				className='btn btn-primary'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'
			>
				Launch demo modal
			</button>

			<div
				className='modal fade'
				id='exampleModal'
				tabIndex={-1}
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Modal title
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>...</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button type='button' className='btn btn-primary'>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
