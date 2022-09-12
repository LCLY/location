import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Modal from "../component/Modal";

export default function Home() {
	const [workOrders, setWorkOrders] = useState(null);
	const [modalTarget, setModalTarget] = useState(null);
	const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

	const showModal = (ref_no) => {
		const { Modal } = require("bootstrap");
		const myModal = new Modal(ref_no);
		myModal.show();
	};

	useEffect(() => {
		axios
			.post("https://fmstest.dev2ezasia.com/api/token/", {
				username: "test123",
				password: "2ezasiatest",
			})
			.then((res) => {
				localStorage.setItem("accessToken", res.data.access);
				localStorage.setItem("refreshToken", res.data.refresh);

				axios
					.get("https://fmstest.dev2ezasia.com/api/v1/work_orders/", {
						headers: { Authorization: `Bearer ${res.data.access}` },
					})
					.then((res) => setWorkOrders(res.data.results))
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className={styles.container}>
				<Head>
					<title>Create Next App</title>
					<meta name='description' content='Generated by create next app' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<div className={styles.main__table}>
					<table className={`table`}>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Ref No</th>
								<th scope='col'>Title</th>
								<th scope='col'>Edit</th>
							</tr>
						</thead>
						<tbody>
							{workOrders
								? workOrders.map((child, index) => (
										<tr key={index}>
											<th scope='row'>{index + 1}</th>
											<td>{child.ref_no}</td>
											<td>{child.title}</td>
											<td>
												<button
													type='button'
													data-bs-toggle='modal'
													data-bs-target={"exampleModal"}
													className={`btn btn-primary ${styles["main__table-button"]}`}
													onClick={() => {
														showModal(child.ref_no);
														setModalTarget(child.ref_no);
														setSelectedWorkOrder(child);
													}}
												>
													Edit Status
												</button>
												<button type='button' className='btn btn-dark'>
													View Map
												</button>
											</td>
										</tr>
								  ))
								: null}
						</tbody>
					</table>
				</div>
			</div>{" "}
			{selectedWorkOrder && modalTarget && (
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
			)}
		</>
	);
}
