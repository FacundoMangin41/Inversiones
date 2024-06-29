import React from 'react';
import "./estadisticas.css"
import TarjetaGananciaDiaria from "../estadisticas/target/ganancias/TarjetaGananciaDiaria";
import TarjetaPromedioPorDia from "../estadisticas/target/promedio/TarjetaPromedioPorDia";
import Promedios from "../estadisticas/target/promedio/Promedios";
import Ganancias from "../estadisticas/target/ganancias/Ganancias";
import Tramitacion from './target/tramitacion/Tramitacion';
import GraficoEnLinea from "./graficos/GraficoEnLinea";
import TortaPromedios from "./graficos/TortaPromedios";
import Box from '@mui/material/Box';

function EstadisticasPrincipal() {
    return (

        <div className="subContenedorEstadisticas">

            <div className="estadisticasLadoIzquierdo">
                <div className="tarjetasPrincipales">
                    <TarjetaGananciaDiaria />
                    <TarjetaPromedioPorDia />
                </div>
                <div className="graficosEstadisticasLadoIzquierdo">
                    <GraficoEnLinea />
                    <TortaPromedios />
                </div>
            </div>

            <div className="estadisticasLadoDerecho">
                <Ganancias />
                <Promedios />
                <Tramitacion />
            </div>

        </div>
    );
}

export default EstadisticasPrincipal;