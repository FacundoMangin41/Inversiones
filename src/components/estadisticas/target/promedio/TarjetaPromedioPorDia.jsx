import React from 'react';

import PromedioTotal from "../../Logica/Promedios/PromedioTotal";

import "../css/tarjetas.css";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const TarjetaPromedioPorDia = () => {
  const promedioTotal = PromedioTotal();

  return (
    <div>
      <Card className='Tarjetas tarjetaPromedio'>
        <CardContent className='textoTarjetas'>
          Promedio de Ganancias por dia
        </CardContent>
        <div className='contenedorTarjeta '>
          <AnalyticsIcon className='iconoTarjeta' />
          <div className='calculoTarjetas '>
            <h1>{promedioTotal}<span> usdt</span></h1>
          </div>
        </div>
      </Card>
    </div>
    
  );
};

export default TarjetaPromedioPorDia;