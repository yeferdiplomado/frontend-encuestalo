import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export const ListarUsuarios = (props) => {
	const [usuarios, setUsuarios] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/usuarios", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setUsuarios(response.data);
				setLoading(false);
			});
	}, [setUsuarios]);

	function redirectUserId(usuario) {
		return props.history.push("/usuarios/editar/" + usuario.id);
	}

	function borrar(usuario) {
		var opcion = window.confirm("El elemento seleccionado se eliminará. ¿Desea continuar?");
		if (opcion) {
			axios
				.delete("https://deploy-backend-yefferson.herokuapp.com/usuarios/" + usuario, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					window.location.reload();
				}).catch(error => {
					console.error(error);
				})
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
			<h1>Usuarios</h1>
			<Link className="btn btn-primary my-4" to="/usuarios/crear">
				Crear
			</Link>
			<table className="table table-bordered table-dark">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombres</th>
						<th>Email</th>
						<th> Actions</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((usuario, key) => (
						<tr key={usuario.id}>
							<td className="idUsu">{usuario.id}</td>
							<td className="campUsu">{usuario.nombres}</td>
							<td className="campUsu">{usuario.email}</td>
							<td>
								<button className="btn btn-primary mx-4" onClick={() => redirectUserId(usuario)}>
									<i className="fa fa-pencil"></i>
								</button>
								<button className="btn btn-danger" onClick={() => borrar(usuario.id)}>
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
