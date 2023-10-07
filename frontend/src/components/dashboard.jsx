import React , {useEffect} from "react";
import "../assets/css/dashboard.css";
import logo from "../assets/logoKario.png";
import { useNavigate } from "react-router-dom";
import imagenPersona from "../assets/imagen.jpg";

const Dashboard = () =>{
    
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/");
        }, 2000);

        
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="main">
            <div className="card2">
                <img className="logo2" src={logo} alt="si" />
                <p className="media2">MEDIA</p>
                <h2 className="h2-2">Bienvenido de nuevo</h2>
                <img className="imagenPersona" src={imagenPersona} alt="no"/>
                <p className="nombrePersona">Pedro Felipe Gómez Bonilla</p>
                <p className="rol">Usuario Administrador</p>
            </div>

        </div>
    )
}

export default Dashboard;