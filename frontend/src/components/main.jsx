import axios from "axios";
import "../assets/css/main.css";
import bug from "../assets/svgs/bug.svg";
import persona from "../assets/imagen.jpg";
import bell from "../assets/svgs/bell.svg";
import help from "../assets/svgs/help.svg";
import logo from "../assets/logoKario.png";
import plus from "../assets/svgs/plus.svg";
import gear from "../assets/svgs/gear.svg";
import trash from "../assets/svgs/trash.svg";
import reload from "../assets/svgs/reload.svg";
import React, { useState, useEffect } from "react";
import hamburguer from "../assets/svgs/hamburguer.svg";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


const Main = () => {

    const [indicadores, setIndicadores] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:7779/indicadores`)
            .then((response) => {
                setIndicadores(response.data.result)
            })
            .catch((error) => {
                console.log(error);
            })
    })

    return (
        <div className="mainPage">
            <div className="headerPage">
                <div className="addHeader">
                    <img src={plus} alt="la" />
                    <p>Añadir</p>
                </div>
                <div className="refreshHeader">
                    <img src={reload} alt="le" />
                    <p>Refrescar</p>
                </div>
                <div className="deleteHeader">
                    <img src={trash} alt="li" />
                    <p>Eliminar</p>
                </div>
                <img className="logoHeader" src={logo} alt="lo" />
                <div className="reportHeader">
                    <img src={bug} alt="lu" />
                    <p>Reportar</p>
                </div>
                <div className="helpHeader">
                    <img src={help} alt="lulu" />
                    <p>Ayuda</p>
                </div>
                <div className="moreHeader">
                    <img className="gearHeader" src={gear} alt="si" />
                    <img className="bellHeader" src={bell} alt="no" />
                    <img className="personaHeader" src={persona} alt="talvez" />
                </div>
            </div>
            <div className="bodyPage">
                <h1 className="h1Page">Panel de Indicadores</h1>
                <p className="firstTextPage">Aqui puedes visualizar los indicadores propuestos y añadidos por tu equipo de trabajo. Si quieres ver más detalles , dale click a uno de ellos para más información</p>
                <table className="tablePage">
                    <thead>
                        <tr className="trHeaderTable">
                            <th className="headerTableText">Indicador</th>
                            <th className="headerTableText">Descripcion</th>
                            <th className="headerTableText">Categoría</th>
                            <th className="headerTableText">Fecha de Inicio</th>
                            <th className="headerTableText">Fecha de Terminación</th>
                            <th className="headerTableText">Fórmula</th>
                            <th className="headerTableText">Frecuencia</th>
                            <th className="headerTableText">Cumplimiento</th>
                            <th className="headerTableText">Área</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="tbodieTable">
                        {
                            indicadores.map((data) => {
                                return (
                                    <>
                                        <tr style={{ height: "20px" }}></tr>
                                        <tr className="trBodyTable">
                                            <td className="bodyTableText leftTableText">{data.nombre}</td>
                                            <td className="bodyTableText izqData">{data.descripcion}</td>
                                            <td className="bodyTableText">{data.categoria}</td>
                                            <td className="bodyTableText">{data.fecha_inicio}</td>
                                            <td className="bodyTableText">{data.fecha_terminacion}</td>
                                            <td className="bodyTableText">{data.formula}</td>
                                            <td className="bodyTableText">{data.frecuencia}</td>
                                            <td className="bodyTableText circuloData"><CircularProgress value={data.cumplimiento}>{data.cumplimiento}</CircularProgress></td>
                                            <td className="bodyTableText rightTableText">{data.area}</td>
                                            <td><img className="iconoHamburguesa" src={hamburguer} alt="si" /></td>
                                        </tr>
                                        <tr style={{ height: "20px" }}></tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                <p className="bobyButton">Añadir elementos</p>
            </div>
        </div>
    )
}

export default Main;