import React, { useEffect, useState } from "react";
import "../styles/Modal.module.scss";
import GoogleMapReact from "google-map-react";
/* components */
/* 3rd party lib */
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

/* Util */
interface MapModalProps {
	showMap: boolean;
	location: any;
	handleMapClose: any;
	handleMapShow: any;
}

type Props = MapModalProps;

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const MapModal: React.FC<Props> = ({
	showMap,
	location,
	handleMapShow,
	handleMapClose,
}) => {
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627,
		},
		zoom: 11,
	};
	return (
		<>
			<Modal show={showMap} onHide={handleMapClose}>
				<Modal.Header closeButton>
					<Modal.Title>Map</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ height: "400px", width: "100%" }}>
						<iframe
							width='600'
							height='450'
							style={{ border: 0 }}
							loading='lazy'
							allowFullScreen
							src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ92pXbcOV6IkRuasOtcOeKEY&key=YOUR_API_KEY'
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleMapClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default MapModal;
