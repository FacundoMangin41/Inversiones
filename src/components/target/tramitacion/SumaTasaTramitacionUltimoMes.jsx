import React, { useState, useEffect } from 'react';
import "../css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function SumaTasaTramitacionUltimoMes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const calcularSumaTasaTramitacionUltimoMes = () => {
    const now = new Date();
    const ultimoMes = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    let suma = 0;

    rows.forEach((row) => {
      const [day, month, year] = row.fecha.split('/').map(Number);
      const rowDate = new Date(year, month - 1, day);

      if (rowDate >= ultimoMes) {
        suma += parseFloat(row.tasaTramitacion || 0);
      }
    });

    return suma.toFixed(2);
  };

  return (
    <Card className='Tarjetas'>
      <div className='contenedorTarjeta tarjetaTramitacion'>
        <SavingsIcon className='iconoTarjeta' />
        <div className="contenedorTextoTarjeta">
          <div className='calculoTarjetas'>
            <h1>{calcularSumaTasaTramitacionUltimoMes()}<span> usdt</span></h1>
          </div>
          <CardContent className='textoTarjetas'>
            Tasa de tramitacion <br />
            del Último Mes
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
