import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const EditarEncuesta = (props) => {
	const [encuestas, setEncuestas] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/encuestas/" + id, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setEncuestas(response.data);
			});
	}, [id]);

	const handleInChange = (event) => {
		setEncuestas({
			...encuestas,
			[event.target.name]: event.target.value,
		});
	};

	const editar = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			nombre: form.nombre.value,
			usuario_id: form.usuario_id.value,
			descripcion: form.descripcion.value,
		};

		axios
			.put("https://deploy-backend-yefferson.herokuapp.com/encuestas/" + id, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				props.history.push("/encuestas");
			});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<Link className="btn btn-primary  my-4" to="/encuestas">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={editar} key={encuestas.id}>
				<div className="form-group my-3">
					<input
						className="form-control"
						type="text"
						value={encuestas.nombre}
						name="nombre"
						onChange={handleInChange}
					></input>
				</div>
				<div className="form-group my-3">
					<input
						className="form-control"
						type="number"
						value={encuestas.usuario_id}
						name="usuario_id"
						onChange={handleInChange}
					></input>
				</div>
				<div className="form-group my-3">
					<input
						className="form-control"
						type="text"
						value={encuestas.descripcion}
						name="descripcion"
						onChange={handleInChange}
					></input>
				</div>
				<button className="btn btn-success" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
