import React from "react";
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
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

const Main = () => {
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
                <Table className="tablePage">
                    <Thead>
                        <Tr className="trHeaderTable">
                            <Th className="headerTableText">Indicador</Th>
                            <Th className="headerTableText">Descripcion</Th>
                            <Th className="headerTableText">Categoría</Th>
                            <Th className="headerTableText">Fecha de Inicio</Th>
                            <Th className="headerTableText">Fecha de Terminación</Th>
                            <Th className="headerTableText">Fórmula</Th>
                            <Th className="headerTableText">Frecuencia</Th>
                            <Th className="headerTableText">Cumplimiento</Th>
                            <Th className="headerTableText">Área</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="tbodieTable">
                        <Tr className="trBodyTable">
                            <Td className="bodyTableText">Modelador 3D</Td>
                            <Td className="bodyTableText">Interés por dise………</Td>
                            <Td className="bodyTableText">Baja</Td>
                            <Td className="bodyTableText">12/05/21</Td>
                            <Td className="bodyTableText">12/12/21</Td>
                            <Td className="bodyTableText">Met.Ágil</Td>
                            <Td className="bodyTableText">1/4</Td>
                            <Td className="bodyTableText">31%</Td>
                            <Td className="bodyTableText">Marketing</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}

export default Main;