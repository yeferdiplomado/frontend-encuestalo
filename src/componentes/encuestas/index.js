import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export const ListarEncuestas = (props) => {
	const [encuestas, setEncuestas] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/encuestas", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setLoading(false);
				setEncuestas(response.data);
			});
	}, [setEncuestas]);

	function redirectEncuestaId(encuesta) {
		return props.history.push("/encuestas/editar/" + encuesta.id);
	}

	function borrar(encuesta) {
		var opcion = window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
		if (opcion) {
			axios
				.delete("https://deploy-backend-yefferson.herokuapp.com/encuestas/" + encuesta, {
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
			<h1>Encuestas</h1>
			<h1>
				<li className="list-inline-item">
					<Link className="btn btn-primary" to="/encuestas/crear">
						Crear
					</Link>
				</li>
			</h1>
			<table className="table table-bordered table-dark">
				<thead>
					<tr>
						<th className="">ID</th>
						<th>Nombre</th>
						<th className="">Usuario</th>
						<th>Descripcion</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{encuestas.map((encuesta, key) => (
						<tr key={encuesta.id}>
							<td>{encuesta.id}</td>
							<td>{encuesta.nombre}</td>
							<td>{encuesta.usuario_id}</td>
							<td>{encuesta.descripcion}</td>
							<td>
								<button
									className="btn btn-primary mx-4"
									onClick={() => redirectEncuestaId(encuesta)}
								>
									<i className="fa fa-pencil"></i>
								</button>
								<button className="btn btn-danger" onClick={() => borrar(encuesta.id)}>
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
