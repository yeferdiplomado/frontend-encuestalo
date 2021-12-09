import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
	const [nombres, setNombres] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");

	const doRegister = (event) => {
		event.preventDefault();

		const data = {
			nombres,
			email,
			password,
		};

		axios
			.post("https://deploy-backend-yefferson.herokuapp.com/usuarios", data, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				if (!response.data.mensaje) {
					setErrors("Ingresa nuevas credenciales");
					return;
				}
				props.history.push("/login");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	function volver() {
		return props.history.push("/");
	}

	return (
		<>
			{errors && <p className="text-center text-light p-4 bg-danger">{errors}</p>}
			<div className="container-fluid" style={{ width: "50%" }}>
				<h1 className="text-center mt-2 mb-5">Registro</h1>
				<h2 className="text-center">
					<button className="btn btn-primary" onClick={() => volver()}>
						<i className="fa fa-arrow-left"></i>
					</button>
				</h2>
				<form onSubmit={doRegister}>
					<div className="form-group my-4">
						<label htmlFor="nombres">Username: </label>
						<input
							className="form-control"
							type="text"
							placeholder="nombres"
							name="nombres"
							value={nombres}
							onChange={(e) => setNombres(e.target.value)}
						/>
					</div>
					<div className="form-group my-4">
						<label htmlFor="email">Email: </label>
						<input
							className="form-control"
							type="email"
							placeholder="correo"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Contraseña: </label>
						<input
							className="form-control"
							type="password"
							placeholder="contraseña"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="form-group mt-5 text-center d-flex justify-content-evenly align-items-center">
						<Link to="/login">Login</Link>
						<button className="btn btn-success" type="submit">
							Crear
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
