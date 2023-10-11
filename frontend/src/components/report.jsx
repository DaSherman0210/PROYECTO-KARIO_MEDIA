import axios from "axios";
import "../assets/css/report.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Report = () => {

   const navigate = useNavigate();
   const token = localStorage.getItem("token");

   if (!token) {
      navigate("/")
   }

   const [roles, setRoles] = useState("");
   const [asunto, setAsunto] = useState("");
   const usuario = localStorage.getItem('id');
   const [indicador, setIndicador] = useState("");
   const [descripcion, setDescripcion] = useState("");
   const [indicadores, setIndicadores] = useState([]);

   useEffect(() => {
      const rol = localStorage.getItem('rol')
      try {
         if (rol) {
            axios.get(`http://localhost:7778/roles/${rol}`)
            .then((response) => {
               setRoles(response.data.result[0].rol)
            })   
         }else{
            console.log('No se encontró el rol');
         }
      } catch (error) {
         console.log(error);
      }
   })

   useEffect(() => {
      axios.get(`http://localhost:7778/indicadores`)
         .then((response) => {
            setIndicadores(response.data.result)
         })
   })

   const agregarReporte = (e) => {
      try {
         e.preventDefault();
         const token = localStorage.getItem('token');
         axios.defaults.headers.common["user-token"] = token;

         console.log({
            usuario,
            indicador,
            asunto,
            descripcion
         });
         if (roles === 'ADMIN' && token) {
            axios.post(`http://localhost:7778/reportes`, {
               usuario,
               indicador,
               asunto,
               descripcion
            })
            alert('Insertado con exito')
            navigate('/')
         }
         else {
            console.log('no validado');
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="reportMain">
         <div className="reportCard">
            <div className="divCard">
               <a href="/">-Go back-</a>
               <h1 className="h1Report">Reporte a la página</h1>
            </div>
            <form className="formReport" onSubmit={agregarReporte}>
               <div className="divReport">
                  <label className="labelReport">Indicador</label>
                  <select className="selectReport" required value={indicador} onChange={(e) => setIndicador(e.target.value)}>
                     <option>Selecciona un indicador</option>
                     {
                        indicadores.map((data) => {
                           return (
                              <option value={data._id}>{data.nombre}</option>
                           )
                        })
                     }
                  </select>
               </div>
               <div className="divReport">
                  <label className="labelReport">Asunto</label>
                  <input type="text" className="inputReport" required value={asunto} placeholder="Asunto" onChange={(e) => setAsunto(e.target.value)} />
               </div>
               <div className="divReport">
                  <label className="labelReport">Descripcion</label>
                  <input type="text" className="inputReport" required value={descripcion} placeholder="Descripcion" onChange={(e) => setDescripcion(e.target.value)} />
               </div>
               <button className="buttonSubmit" type="submit">Añadir</button>
            </form>
         </div>
      </div>
   )
}

export default Report;