import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const crearPregunta = () => {
	const crear = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			pregunta: form.pregunta.value,
			seccion_id: form.seccion_id.value,
			tipoPregunta: form.tipoPregunta.value,
		};

		axios
			.post("https://deploy-backend-yefferson.herokuapp.com/preguntas", data, {
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
			<Link className="btn btn-primary my-2" to="/preguntas">
				Volver
			</Link>
			<form onSubmit={crear}>
				<select className="form-select" type="text" name="tipoPregunta">
					<option selected value="">
						Seleccionar Tipo...
					</option>
					<option value="Abierta">Abierta</option>
					<option value="Cerrada">Cerrada</option>
					<option value="Multiple">Multiple</option>
					<option value="Multiple Unica Respuesta">Multiple Unica Respuesta</option>
				</select>
				<input
					className="form-control my-2"
					type="number"
					placeholder="ID Seccion"
					name="seccion_id"
				></input>
				<textarea
					className="form-control my-2"
					type="text"
					placeholder="Pregunta"
					name="pregunta"
				></textarea>
				<button className="btn btn-success mt-2" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
