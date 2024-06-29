import React from 'react';
import SumaGananciasUltimaSemana from "../../Logica/Ganancias/SumaGananciasUltimaSemana";
import SumaGananciasUltimoMes from "../../Logica/Ganancias/SumaGananciasUltimoMes";

import AnalyticsIcon from '@mui/icons-material/Analytics';


import "../css/tarjetas.css";

export default function Ganancias() {
  return (
    <div className="ContenedosTarjetasDerecha">
      <div className="subContenedosTarjetasDerecha">
        <div className="tituloTarjetaLadoDerecho">
          <h1>Ganancias</h1>
        </div>
        <div className="contenedorEstadisticasTarjetas">
          <div className="estadisticasTarjetas">
            <p> <AnalyticsIcon className='IconoTarjetaLadoDerecho' /> Total ultima semana: <span><SumaGananciasUltimaSemana /> usdt</span></p>
          </div>
          <div className="estadisticasTarjetas">
            <p> <AnalyticsIcon className='IconoTarjetaLadoDerecho' /> Total ultimo mes: <span><SumaGananciasUltimoMes /> usdt</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
