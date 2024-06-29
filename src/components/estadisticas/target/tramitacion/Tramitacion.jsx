import React from 'react';
import SumaTasaTramitacion from "../../Logica/Tramitaciones/SumaTasaTramitacion";
import SumaTasaTramitacionUltimaSemana from "../../Logica/Tramitaciones/SumaTasaTramitacionUltimaSemana";
import SumaTasaTramitacionUltimoMes from "../../Logica/Tramitaciones/SumaTasaTramitacionUltimoMes";

import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import "../css/tarjetas.css";

export default function Tramitacion() {
  return (
    <div className="ContenedosTarjetasDerecha">
      <div className="subContenedosTarjetasDerecha">
        <div className="tituloTarjetaLadoDerecho">
          <h1>Tramitaciones</h1>
        </div>
        <div className="contenedorEstadisticasTarjetas">
          <div className="estadisticasTarjetas">
            <p> <CreditCardOffIcon className='IconoTarjetaLadoDerecho' /> Total: <span><SumaTasaTramitacion /> usdt</span></p>
          </div>
          <div className="estadisticasTarjetas">
            <p> <MoneyOffIcon className='IconoTarjetaLadoDerecho' /> Total ultima semana: <span><SumaTasaTramitacionUltimaSemana /> usdt</span></p>
          </div>
          <div className="estadisticasTarjetas">
            <p> <CurrencyExchangeIcon className='IconoTarjetaLadoDerecho' /> Total ultimo mes: <span><SumaTasaTramitacionUltimoMes /> usdt</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
