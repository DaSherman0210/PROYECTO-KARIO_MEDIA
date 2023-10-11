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
import borrar from "../assets/svgs/delete.svg";
import { useNavigate } from "react-router-dom";
import reload from "../assets/svgs/reload.svg";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@chakra-ui/react";
import hamburguer from "../assets/svgs/hamburguer.svg";

const Main = () => {
    const navigate = useNavigate();

    const [indicadores, setIndicadores] = useState([]);
    const [showSelect, setShowSelect] = useState(false);
    const [showDeleteColumn, setShowDeleteColumn] = useState(false);
    /* const [selectedIdToDelete, setSelectedIdToDelete] = useState(null); */

    useEffect(() => {
        axios
            .get(`http://localhost:7778/indicadores`)
            .then((response) => {
                setIndicadores(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleImageClick = () => {
        setShowDeleteColumn(!showDeleteColumn);
    };

    const toggleSelect = () => {
        setShowSelect(!showSelect);
    };

    const refreshPage = () => {
        navigate("/");
    };

    const addPage = () => {
        navigate("/add");
    };

    const reportPage = () => {
        navigate("/report");
    };

    const helpPage = () => {
        navigate("/help");
    };

    const handleDelete = (id) => {
        const aceptar = window.confirm("¿Deseas eliminar este elemento?");
        if (aceptar) {
            axios.put(`http://localhost:7778/indicadores/${id}`)
                .then(() => {
                    setIndicadores(indicadores.filter((indicador) => indicador._id !== id))
                })
                .catch((error) => {
                    console.log(error);
                })
            setIndicadores(indicadores.filter((indicador) => indicador._id !== id));
        }
    };

    const logout = () => {
        const confirmar = window.confirm('¿Desea cerrar sesión?');
        if(confirmar){
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('rol');

            navigate('/login');
        } else {
            console.log('Logout cancelado.');
        }
    }

    return (
        <div className="mainPage">
            <div className="headerPage">
                <div className="addHeader" onClick={addPage}>
                    <img src={plus} alt="la" />
                    <p>Añadir</p>
                </div>
                <div className="refreshHeader" onClick={refreshPage}>
                    <img src={reload} alt="le" />
                    <p>Refrescar</p>
                </div>
                <div className="deleteHeader" onClick={handleImageClick}>
                    <img src={trash} alt="li" />
                    <p>Eliminar</p>
                </div>
                <img className="logoHeader" src={logo} alt="lo" />
                <div className="reportHeader" onClick={reportPage}>
                    <img src={bug} alt="lu" />
                    <p>Reportar</p>
                </div>
                <div className="helpHeader" onClick={helpPage}>
                    <img src={help} alt="lulu" />
                    <p>Ayuda</p>
                </div>
                <div className="moreHeader">
                <img className="gearHeader" src={gear} alt="si" onClick={toggleSelect} />
                {showSelect && (
                    <select onChange={(e) => {
                        if (e.target.value === "Cerrar sesión") {
                            logout();
                        }
                    }}>
                        <option>Seleccione una opción</option>
                        <option>Cerrar sesión</option>
                    </select>
                )}
                    <img className="bellHeader" src={bell} alt="no" />
                    <img className="personaHeader" src={persona} alt="talvez" />
                </div>
            </div>
            <div className="bodyPage">
                <h1 className="h1Page">Panel de Indicadores</h1>
                <p className="firstTextPage">
                    Aqui puedes visualizar los indicadores propuestos y añadidos por tu equipo de trabajo. Si quieres ver más detalles, dale click a uno de ellos para más información.
                </p>
                <table className="tablePage">
                    <thead>
                        <tr className="trHeaderTable">
                            {showDeleteColumn && <th className="headerTableText">Eliminar</th>}
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
                        {indicadores.map((data) => (
                            <React.Fragment key={data._id}>
                                <tr style={{ height: "20px" }}></tr>
                                <tr className="trBodyTable">
                                    {showDeleteColumn && (
                                        <td className="bodyTableText" onClick={() => handleDelete(data._id)}>
                                            <img src={borrar} alt="si" />
                                        </td>
                                    )}
                                    <td className="bodyTableText leftTableText">{data.nombre}</td>
                                    <td className="bodyTableText izqData">{data.descripcion}</td>
                                    <td className="bodyTableText">{data.categoria}</td>
                                    <td className="bodyTableText">{data.fecha_inicio}</td>
                                    <td className="bodyTableText">{data.fecha_terminacion}</td>
                                    <td className="bodyTableText">{data.formula}</td>
                                    <td className="bodyTableText">{data.frecuencia}</td>
                                    <td className="bodyTableText">
                                        <div>
                                            <CircularProgress
                                                value={data.cumplimiento}
                                                color={
                                                    data.cumplimiento < 50
                                                        ? "red"
                                                        : data.cumplimiento >= 50 && data.cumplimiento <= 75
                                                            ? "orange"
                                                            : "green"
                                                }
                                                className="circuloTable"
                                            />
                                            <p className="numerosTable">{data.cumplimiento}%</p>
                                        </div>
                                    </td>
                                    <td className="bodyTableText rightTableText">{data.area}</td>
                                    <td>
                                        <img className="iconoHamburguesa" src={hamburguer} alt="si" />
                                    </td>
                                </tr>
                                <tr style={{ height: "5px" }}></tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <p onClick={addPage} className="bobyButton">
                    Añadir elementos
                </p>
            </div>
        </div>
    );
};

export default Main;
