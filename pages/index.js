import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import ModalComponent from "../component/Modal";
import MapModal from "../component/MapModal";

export default function Home() {
	const [workOrders, setWorkOrders] = useState(null);
	const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
	const [jobStatus, setJobStatus] = useState(null);
	const [location, setLocation] = useState(null);
	const [show, setShow] = useState(false);
	const [showMap, setShowMap] = useState(false);

	const handleMapClose = () => {
		setShowMap(false);
		setLocation(null); //reset the location after close
	};
	const handleMapShow = () => setShowMap(true);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = () => {
		setShow(false);

		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						lat: position.coords.latitude,
						long: position.coords.longitude,
					});

					axios
						.patch(
							`https://fmstest.dev2ezasia.com/api/v1/work_orders/${selectedWorkOrder.id}/`,

							{
								job_status: jobStatus,
								lat: position.coords.latitude,
								long: position.coords.longitude,
							},
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"accessToken"
									)}`,
								},
							}
						)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => console.log(err));
				},
				() => {
					alert("Unable to retrieve your location");
				}
			);
		}
	};

	useEffect(() => {
		console.log(location);
	}, [location]);

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
													className={`btn btn-primary ${styles["main__table-button"]}`}
													onClick={() => {
														handleShow();
														setSelectedWorkOrder(child);
													}}
												>
													Edit Status
												</button>
												<button
													disabled={
														location === null ||
														selectedWorkOrder.id !== child.id
													}
													type='button'
													className='btn btn-dark'
													onClick={() => {
														handleMapShow();
													}}
												>
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
			{selectedWorkOrder && (
				<ModalComponent
					show={show}
					jobStatus={jobStatus}
					setJobStatus={setJobStatus}
					handleClose={handleClose}
					handleSubmit={handleSubmit}
					selectedWorkOrder={selectedWorkOrder}
				/>
			)}
			{location && (
				<MapModal
					showMap={showMap}
					location={location}
					handleMapClose={handleMapClose}
					handleMapShow={handleMapShow}
				/>
			)}
		</>
	);
}
