import "../assets/css/logo.css";
import React, {useEffect} from "react";
import logo from "../assets/logoKario.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate();
    
    useEffect(() => {

        const token = localStorage.getItem('fakeToken'); 

        if (token) {
            const timer = setTimeout(() => {
                navigate("/main");
                }, 2000);
        
                return () => clearTimeout(timer);
        }else{
            const timer = setTimeout(()=>{
                navigate("/login");
            }, 2000)

            return () => clearTimeout(timer);
        }
    }, [navigate]);
    
    return(
        <div className="logoImg">
            <img className="loguito" src={logo} alt="talvez"/>
        </div>
    )
}

export default Logo;