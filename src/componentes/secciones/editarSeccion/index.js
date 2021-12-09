import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const EditarSeccion = (props) => {
	const [secciones, setSeccion] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/secciones/" + id, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setSeccion(response.data);
			});
	}, [id]);

	const handleInChange = (event) => {
		setSeccion({
			...secciones,
			[event.target.name]: event.target.value,
		});
	};

	const editar = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			nombre: form.nombre.value,
			encuesta_id: form.encuesta_id.value,
		};

		axios
			.put("https://deploy-backend-yefferson.herokuapp.com/secciones/" + id, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				props.history.push("/secciones");
			});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<Link className="btn btn-primary my-4" to="/secciones">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={editar} key={secciones.id}>
				<div className="form-group my-3">
					<input
						className="form-control"
						type="text"
						value={secciones.nombre}
						onChange={handleInChange}
						name="nombre"
					></input>
				</div>
				<div className="form-group my-3">
					<input
						className="form-control"
						type="number"
						value={secciones.encuesta_id}
						onChange={handleInChange}
						name="encuesta_id"
					></input>
				</div>
				<button className="btn btn-success" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
