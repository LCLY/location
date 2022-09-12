import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
	const [workOrders, setWorkOrders] = useState(null);

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
						headers: { Authorization: localStorage.getItem("accessToken") },
					})
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>First</th>
						<th scope='col'>Last</th>
						<th scope='col'>Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope='row'>2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope='row'>3</th>
						<td colspan='2'>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
