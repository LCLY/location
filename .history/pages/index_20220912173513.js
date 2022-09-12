import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Modal from "../component/Modal";

export default function Home() {
	const [workOrders, setWorkOrders] = useState(null);
	const [selectWorkOrder, setSelectWorkOrder] = useState(null);

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
			<Modal />
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
													className={`btn btn-primary ${styles["main__table-button"]}`}
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
			</div>
		</>
	);
}
