import React, { useState, useEffect } from 'react';
import "./css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';

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
    <div className='containerTarjetas'>
      <SavingsIcon className='iconoTarjeta'/>
      <div className="contenedorTarjetasInformacion">
        <h1>{calcularSumaTasaTramitacion()}<span> USDT</span></h1>
        <h3>Tasa de tramitacion Acumuladas</h3>
      </div>
    </div>
  );
}
