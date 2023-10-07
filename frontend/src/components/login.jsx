import React from "react";
import logo from "../assets/logoKario.png";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "../assets/css/login.css";

const Login = () => {
    
    const navigate = useNavigate();

    const agregarToken = () =>{
        localStorage.setItem("fakeToken", "hola")
    }

    return(
        <div className="login">
            <div className="miniLogin">
            <div className="card">
            <img src={logo} alt="hola" />
            <p className="media">MEDIA</p>
            <h2>Bienvenido al panel digital de KARIO Media</h2>
            <p className="text">Por favor ingresa los siguientes datos para ingresar a la plataforma</p>
            <form>
                <div className="user">
                    <label >Usuario</label>
                    <input type="text" />
                </div>
                <div className="password">
                    <label>Contraseña</label>
                    <input type="password" />
                </div>
                <Button className="button" onClick={()=>{
                    agregarToken();
                    navigate("/dashboard")
                }}>Ingresar al panel</Button>  

            </form>
            <p className="ultimoText">Tienes problemas para ingresar? Por favor contactarse con asistencia técnica lo más pronto posible</p>
        </div>
            </div>
        </div>
    )
}

export default Login;