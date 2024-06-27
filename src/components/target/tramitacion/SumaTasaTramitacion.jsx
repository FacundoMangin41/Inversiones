import React, { useState, useEffect } from 'react';
import "../css/tarjetas.css";
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function SumaTasaTramitacion() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const calcularSumaTasaTramitacion = () => {
    let suma = 0;
    rows.forEach((row) => {
      suma += parseFloat(row.tasaTramitacion || 0);
    });
    return suma.toFixed(2);
  };

  return (
    <Card className='Tarjetas '>
      <div className='contenedorTarjeta tarjetaTramitacion'>
        <CreditCardOffIcon className='iconoTarjeta' />
        <div className="contenedorTextoTarjeta">
          <div className='calculoTarjetas'>
            <h1>{calcularSumaTasaTramitacion()}<span> usdt</span></h1>
          </div>
          <CardContent className='textoTarjetas'>
            Tasa de tramitacion Acumuladas
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
