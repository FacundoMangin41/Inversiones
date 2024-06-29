import React from 'react';
import PromedioTotal from "../../Logica/Promedios/PromedioTotal";
import PromedioUltimaSemana from "../../Logica/Promedios/PromedioUltimaSemana";
import PromedioUltimoMes from "../../Logica/Promedios/PromedioUltimoMes";

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


import "../css/tarjetas.css";

export default function Promedios() {
  return (
    <div className="ContenedosTarjetasDerecha">
      <div className="subContenedosTarjetasDerecha">
        <div className="tituloTarjetaLadoDerecho">
          <h1>Promedio de Ganancia</h1>
        </div>
        <div className="contenedorEstadisticasTarjetas">
          <div className="estadisticasTarjetas">
            <p> <LeaderboardIcon className='IconoTarjetaLadoDerecho' /> Total ultima semana: <span><PromedioUltimaSemana /> usdt</span></p>
          </div>
          <div className="estadisticasTarjetas">
            <p> <QueryStatsIcon className='IconoTarjetaLadoDerecho' /> Total ultimo mes: <span><PromedioUltimoMes /> usdt</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
