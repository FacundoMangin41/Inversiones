import React, { useState, useEffect } from 'react';
import "./css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';

export default function SumaGananciasDiarias() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const calcularSumaGanancias = () => {
    let suma = 0;
    rows.forEach((row) => {
      suma += parseFloat(row.gananciaDiaria || 0);
    });
    return suma.toFixed(2);
  };

  return (
    <div className='containerTarjetas'>
      <SavingsIcon className='iconoTarjeta'/>
      <div className="contenedorTarjetasInformacion">
        <h1>{calcularSumaGanancias()}<span> USDT</span></h1>
        <h3>Ganancias totales</h3>
      </div>
    </div>
  );
}
