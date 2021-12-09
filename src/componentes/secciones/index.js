import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

export const ListarSecciones = (props) => {
	const [secciones, setSecciones] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/secciones", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setSecciones(response.data);
				setLoading(false);
			});
	}, [setSecciones]);

	function redirectSeccionId(seccion) {
		return props.history.push("/secciones/editar/" + seccion.id);
	}

	function borrar(seccion) {
		var opcion = window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
		if (opcion) {
			axios
				.delete("https://deploy-backend-yefferson.herokuapp.com/secciones/" + seccion, {
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
			<h1>Secciones</h1>
			<Link className="btn btn-primary" to="/secciones/crear">
				Crear
			</Link>
			<table className="table table-bordered table-dark my-4">
				<thead>
					<tr>
						<th className="id">ID</th>
						<th className="titCampSec">Nombre</th>
						<th className="titLastSec">ID Encuesta</th>
					</tr>
				</thead>
				<tbody>
					{secciones.map((seccion, key) => (
						<tr key={seccion.id}>
							<td>{seccion.id}</td>
							<td>{seccion.nombre}</td>
							<td>{seccion.encuesta_id}</td>
							<td>
								<button className="btn btn-primary mx-4" onClick={() => redirectSeccionId(seccion)}>
									<i className="fa fa-pencil"></i>
								</button>
								<button className="btn btn-danger" onClick={() => borrar(seccion.id)}>
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
