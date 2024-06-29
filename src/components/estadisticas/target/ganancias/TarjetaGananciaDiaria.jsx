import React from 'react';
import SumaGananciasDiarias from "../../Logica/Ganancias/SumaGananciasDiarias";

import "../css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const TarjetaGananciaDiaria = () => {
  return (
    <Card className='Tarjetas tarjetaGanancias'>
      <CardContent className='textoTarjetas'>
        Ganancias Acumuladas
      </CardContent>
      <div className='contenedorTarjeta '>
        <SavingsIcon className='iconoTarjeta' />
        <div className='calculoTarjetas '>
          <h1>{SumaGananciasDiarias()}<span> usdt</span></h1>
        </div>
      </div>
    </Card>
  );
};

export default TarjetaGananciaDiaria;