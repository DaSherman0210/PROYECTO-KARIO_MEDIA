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
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const idUsuario = localStorage.getItem('id');
        if (idUsuario) {
            axios
            .get(`http://localhost:7778/usuarios/${idUsuario}`)
            .then((response) => {
                console.log(response.data.result[0].imagen);
                setDataUsuario(response.data.result);
            })
            .catch((error) => {
                console.log(error, "Error al obtener usuario por ID.");
            })   
        }else{
            navigate("/")
        }
    }, [navigate])

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