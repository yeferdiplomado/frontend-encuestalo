import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const EditarPregunta = (props) => {
	const [preguntas, setPregunta] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get("https://deploy-backend-yefferson.herokuapp.com/preguntas/" + id, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setPregunta(response.data);
			});
	}, [id]);

	const handleInChange = (event) => {
		setPregunta({
			...preguntas,
			[event.target.name]: event.target.value,
		});
	};

	const editar = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			pregunta: form.pregunta.value,
			seccion_id: form.seccion_id.value,
			tipoPregunta: form.tipoPregunta.value,
		};

		axios
			.put("https://deploy-backend-yefferson.herokuapp.com/preguntas/" + id, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				props.history.push("/preguntas");
			});
	};

	return (
		<div className="container-fluid" style={{ width: "50%" }}>
			<h1>Editar</h1>
			<Link className="btn btn-primary" to="/preguntas">
				<i className="fa fa-arrow-left"></i>
			</Link>
			<form onSubmit={editar} key={preguntas.id}>
				<div className="my-2">
					<select
						className="form-select my-2"
						type="text"
						value={preguntas.tipoPregunta}
						onChange={handleInChange}
						name="tipoPregunta"
					>
						<option value="Abierta">Abierta</option>
						<option value="Cerrada">Cerrada</option>
						<option value="Multiple">Multiple</option>
						<option value="Multiple Unica Respuesta">Multiple Unica Respuesta</option>
					</select>
					<input
						className="form-control"
						type="number"
						placeholder="Seccion ID"
						value={preguntas.seccion_id}
						onChange={handleInChange}
						name="seccion_id"
					></input>
					<textarea
						className="form-control mt-4"
						type="text"
						placeholder="Pregunta"
						name="pregunta"
					></textarea>
					<button className="btn btn-success mt-2" type="submit">
						<i className="fa fa-check"></i>
					</button>
				</div>
			</form>
		</div>
	);
};
