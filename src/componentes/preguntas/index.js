import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

export const ListarPreguntas = (props) => {
	const [preguntas, setPreguntas] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/preguntas", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setLoading(false);
				setPreguntas(response.data);
			});
	}, [setPreguntas]);

	function redirectPreguntaId(pregunta) {
		return props.history.push("/preguntas/editar/" + pregunta.id);
	}

	function borrar(pregunta) {
		var opcion = window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
		if (opcion) {
			axios
				.delete("https://deploy-backend-yefferson.herokuapp.com/preguntas/" + pregunta, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					window.location.reload();
				});
		}
	}

	return (
		<div className="container-fluid">
			<div className="spinner">
				{loading && (
					<div className="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
			</div>
			<h1>Preguntas</h1>
			<Link className="btn btn-primary" to="/preguntas/crear">
				Crear
			</Link>

			<table className="table table-bordered table-dark my-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Pregunta</th>
						<th>ID Seccion</th>
						<th>Tipo Pregunta</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{preguntas.map((pregunta, key) => (
						<tr key={pregunta.id}>
							<td className="color-red">{pregunta.id}</td>
							<td>{pregunta.pregunta}</td>
							<td>{pregunta.seccion_id}</td>
							<td>{pregunta.tipoPregunta}</td>
							<td>
								<button
									className="btn btn-primary mx-4"
									onClick={() => redirectPreguntaId(pregunta)}
								>
									<i className="fa fa-pencil"></i>
								</button>
								<button className="btn btn-danger" onClick={() => borrar(pregunta.id)}>
									<i className="fa fa-trash"></i>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
