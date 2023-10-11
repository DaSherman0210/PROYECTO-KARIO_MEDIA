import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import logo from "../assets/logoKario.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [dataUsuario, setDataUsuario] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const idUsuario = localStorage.getItem('id');
        const idRol = localStorage.getItem('rol');
        console.log(idRol);
        console.log(idUsuario);
        axios
            .get(`http://localhost:7778/usuarios/${idUsuario}`)
            .then((response) => {
                setDataUsuario(response.data.result);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error, "Error al obtener usuario por ID.");
            })
    }, [])

    return (
        <div className="main">
            <div className="card2">
                {
                    dataUsuario.map((data) => {
                        return(
                            <>
                                <img className="logo2" src={logo} alt="si" />
                                <p className="media2">MEDIA</p>
                                <h2 className="h2-2">Bienvenido de nuevo</h2>
                                <img className="imagenPersona" src={data.imagen} alt="no"/>
                                <p className="nombrePersona">{data.nombre}</p>
                                <p className="rol">Rol: {data.nombreRol.rol}</p>
                            </>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Dashboard;