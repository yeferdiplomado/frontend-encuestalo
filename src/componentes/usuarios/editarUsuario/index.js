import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const EditarUsuario = (props) => {
	const [usuarios, setUsuarios] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/usuarios/" + id, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setUsuarios(response.data);
			});
	}, [id]);

	const handleInputChange = (event) => {
		setUsuarios({
			...usuarios,
			[event.target.name]: event.target.value,
		});
	};

	const editar = (event) => {
		event.preventDefault();
		const form = event.target;
		console.log(form.nombres.value);
		const data = {
			nombres: form.nombres.value,
			email: form.email.value,
		};

		axios
			.put("https://deploy-backend-yefferson.herokuapp.com/usuarios/" + id, data, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				props.history.push("/usuarios");
			});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<Link className="btn btn-primary  my-4" to="/usuarios">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={editar} key={usuarios.id}>
				<div className="form-group my-4">
					<input
						className="form-control"
						type="text"
						value={usuarios.nombres}
						name="nombres"
						onChange={handleInputChange}
					></input>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						type="email"
						value={usuarios.email}
						name="email"
						onChange={handleInputChange}
					></input>
				</div>
				<button className="btn btn-success mt-3" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
