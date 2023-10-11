import axios from "axios";
import "../assets/css/help.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Help = () => {

   const navigate = useNavigate();

   const [asunto, setAsunto] = useState("");
   const usuario = localStorage.getItem('id');
   const [descripcion, setDescripcion] = useState("");

   const agregarAyuda = (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token');
      axios.defaults.headers.common["user-token"] = token;

      console.log({
         usuario,
         asunto,
         descripcion
      });
      if (token) {
         axios.post(`http://localhost:7778/ayudas`, {
            usuario,
            asunto,
            descripcion
         })
         alert('Gracias por su mensaje, pronto será atentido');
         navigate("/")
      } else {
         console.log("Fallando post");
      }
   }

   return (
      <div className="helpMain">
         <div className="helpCard">
            <div className="divCard">
               <a href="/">-Go Back-</a>
               <h1 className="h1Help">Ayuda</h1>
            </div>
            <form className="formHelp" onSubmit={agregarAyuda}>
               <div className="divHelp">
                  <label className="labelHelp">Asunto</label>
                  <input className="inputHelp" type="text" placeholder="Asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
               </div>
               <div className="divHelp">
                  <label className="labelHelp">Descripcion</label>
                  <input className="inputHelp" type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
               </div>
               <button className="buttonSubmit" type="submit">Añadir</button>
            </form>
         </div>
      </div>
   )
}

export default Help;