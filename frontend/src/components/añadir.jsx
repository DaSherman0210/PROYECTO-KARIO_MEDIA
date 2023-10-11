import axios from "axios";
import "../assets/css/add.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Añadir = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    if (!token) {
        navigate("/")
    }

    const [area, setArea] = useState("");
    const [roles, setRoles] = useState("");
    const [nombre, setNombre] = useState("");
    const [formula, setFormula] = useState("");
    const [categoria, setCategoria] = useState("");
    const [frecuencia, setFrecuencia] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cumplimiento, setCumplimiento] = useState(0);
    const [fecha_inicio, setFecha_inicio] = useState("");
    const [fecha_terminacion, setFecha_terminacion] = useState("");

    useEffect(() => {
        const rol = localStorage.getItem('rol')
        try {
            if (rol) {
                axios.get(`http://localhost:7778/roles/${rol}`)
                .then((response) => {
                    setRoles(response.data.result[0].rol)
                })   
            }else{
                console.log('No se encontro el rol');
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    })

    const postIndicador = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.defaults.headers.common["user-token"] = token;

        if (roles === 'ADMIN' && token) {
            axios
                .post(`http://localhost:7778/indicadores`, {
                    nombre,
                    categoria,
                    fecha_inicio,
                    fecha_terminacion,
                    formula,
                    frecuencia,
                    cumplimiento,
                    area,
                    descripcion
                })
            alert('Insertado con exito');
            navigate('/');
        }
        else {
            console.log('No es admin');
        }
    }

    return (
        <div className="addMain">
            <div className="add2Main">
                <div className="h1Div">
                    <a href="/" className="ah1"> -Go back-</a>
                    <p className="h1MainAdd">Añadir Indicador</p>
                </div>
                <form onSubmit={postIndicador}>
                    <div className="divAdd indicadorAdd">
                        <label>Indicador</label>
                        <input
                            type="text"
                            required
                            placeholder="Indicador"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="divAdd descripcionAdd">
                        <label>Descripcion</label>
                        <input
                            type="text"
                            required
                            placeholder="Descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                    <div className="divAdd categoriaAdd">
                        <label>Categoria</label>
                        <input
                            type="text"
                            required
                            placeholder="Categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        />
                    </div>
                    <div className="divAdd fechaInicioAdd">
                        <label>Fecha de Inicio</label>
                        <input
                            type="date"
                            required
                            placeholder="Fecha de Inicio"
                            value={fecha_inicio}
                            onChange={(e) => setFecha_inicio(e.target.value)}
                        />
                    </div>
                    <div className="divAdd fechaFinalizacionAdd">
                        <label>Fecha de finalizacion</label>
                        <input
                            type="date"
                            required
                            placeholder="Fecha de Finalizacion"
                            value={fecha_terminacion}
                            onChange={(e) => setFecha_terminacion(e.target.value)}
                        />
                    </div>
                    <div className="divAdd formula">
                        <label>Formula</label>
                        <input
                            type="text"
                            required
                            placeholder="Formula"
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                        />
                    </div>
                    <div className="divAdd frecuencia">
                        <label>Frecuencia</label>
                        <select
                            required
                            value={frecuencia}
                            className="selectInputAdd"
                            onChange={(e) => setFrecuencia(e.target.value)}
                        >
                            <option >Selecciona Valor</option>
                            <option value="1/2">1/2</option>
                            <option value="1/3">1/3</option>
                            <option value="1/4">1/4</option>
                            <option value="2/4">2/4</option>
                        </select>
                    </div>
                    <div className="divAdd cumplimiento">
                        <label>Cumplimiento</label>
                        <input
                            type="number"
                            max="100"
                            min="0"
                            required
                            placeholder="Cumplimiento"
                            value={cumplimiento}
                            onChange={(e) => setCumplimiento(Number(e.target.value))}
                        />
                    </div>
                    <div className="divAdd Area">
                        <label>Area</label>
                        <input
                            type="text"
                            required
                            placeholder="Area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </div>
                    <button className="buttonSubmit" type="submit">Añadir</button>
                </form>
            </div>
        </div>
    )
}

export default Añadir;