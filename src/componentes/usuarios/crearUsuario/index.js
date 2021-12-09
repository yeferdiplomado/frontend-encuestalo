import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const crearUsuario = () => {
	const crearUsuario = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			nombres: form.nombres.value,
			email: form.email.value,
			contrasena: form.contrasena.value,
		};

		axios.post("https://deploy-backend-yefferson.herokuapp.com/usuarios", data).then((response) => {
			window.history.back();
		});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<Link className="btn btn-primary my-2" to="/usuarios">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={crearUsuario}>
				<input
					className="form-control my-2"
					type="text"
					placeholder="Nombres"
					name="nombres"
				></input>
				<input className="form-control my-2" type="email" placeholder="Email" name="email"></input>
				<input
					className="form-control my-2"
					type="password"
					placeholder="Contraseña"
					name="contrasena"
				></input>
				<button className="btn btn-success mt-2" type="submit">
					<i className="fa fa-check"></i>
				</button>
			</form>
		</div>
	);
};
