import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");

	const handleLogin = (event) => {
		event.preventDefault();

		const data = {
			email,
			password,
		};

		axios
			.post("https://deploy-backend-yefferson.herokuapp.com/login", data, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				if (!response.data.token) {
					setErrors(response.data.message);
					return;
				}
				localStorage.setItem("token", response.data.token);
				props.setUser(localStorage.getItem("token"));
				props.history.push("/");
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
				<h1 className="text-center mt-2 mb-5">Iniciar Sesion</h1>
				<h2 className="text-center">
					<button className="btn btn-primary" onClick={() => volver()}>
						<i className="fa fa-arrow-left"></i>
					</button>
				</h2>
				<form onSubmit={handleLogin}>
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
						<Link to="/usuarios/crear">Registrarse</Link>
						<button className="btn btn-success" type="submit">
							Ingresar
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
