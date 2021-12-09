import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const crearSeccion = () => {
	const crear = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			nombre: form.nombre.value,
			encuesta_id: form.encuesta_id.value,
		};

		axios
			.post("https://deploy-backend-yefferson.herokuapp.com/secciones", data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				window.history.back();
			});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<Link className="btn btn-primary my-2" to="/secciones">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={crear}>
				<input className="form-control my-2" type="text" placeholder="Nombre" name="nombre"></input>
				<input
					className="form-control my-2"
					type="number"
					placeholder="ID Encuesta"
					name="encuesta_id"
				></input>
				<button className="btn btn-success mt-2" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
