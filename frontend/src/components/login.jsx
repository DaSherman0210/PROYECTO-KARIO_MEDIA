import axios from "axios";
import "../assets/css/login.css";
import React, { useState } from "react";
import logo from "../assets/logoKario.png";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        try {
            e.preventDefault();
            console.log({
                email, password
            });
            const logueo = await axios
                .post(`http://localhost:7778/auth/login`, 
                {
                    email,
                    password
                })

            if (logueo) {
                localStorage.setItem('token', logueo.data.token);
                localStorage.setItem('rol', logueo.data.usuario.rol);
                navigate("/");
                return logueo;
            }

        } catch (error) {
            alert('Email o Contraseña incorrecta')
            console.log(error);
        }
    }

    /* const agregarToken = () =>{
        localStorage.setItem("fakeToken", "hola")
    } */

    return (
        <div className="login">
            <div className="miniLogin">
                <div className="card">
                    <img src={logo} alt="hola" />
                    <p className="media">MEDIA</p>
                    <h2>Bienvenido al panel digital de KARIO Media</h2>
                    <p className="text">Por favor ingresa los siguientes datos para ingresar a la plataforma</p>
                    <form onSubmit={login}>
                        <div className="user">
                            <label>Email</label>
                            <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="password">
                            <label>Contraseña</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="button">Ingresar al panel</Button>

                    </form>
                    <p className="ultimoText">Tienes problemas para ingresar? Por favor contactarse con asistencia técnica lo más pronto posible</p>
                </div>
            </div>
        </div>
    )
}

export default Login;