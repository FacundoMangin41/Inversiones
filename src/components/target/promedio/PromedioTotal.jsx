import React, { useState, useEffect } from 'react';
import "../css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function PromedioTotal() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const calcularPromedioGanancias = () => {
    let sumaGanancias = 0;
    let count = 0;
    rows.forEach((row) => {
      if (row.gananciaDiaria) {
        sumaGanancias += parseFloat(row.gananciaDiaria);
        count += 1;
      }
    });
    if (count === 0) {
      return 0;
    }
    return (sumaGanancias / count).toFixed(2);
  };

  return (
    <Card className='Tarjetas'>
      <div className='contenedorTarjeta tarjetaPromedio'>
        <SavingsIcon className='iconoTarjeta'/>
        <div className="contenedorTextoTarjeta">
          <div className='calculoTarjetas tarjetaPromedio'>
            <h1>{calcularPromedioGanancias()}<span> usdt</span></h1>
          </div>
          <CardContent className='textoTarjetas'>
            Promedio total de Ganancias <br />
            por dia
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
