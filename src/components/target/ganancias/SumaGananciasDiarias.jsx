import React, { useState, useEffect } from 'react';
import "../css/tarjetas.css";
import SavingsIcon from '@mui/icons-material/Savings';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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


    <Card className='Tarjetas tarjetaGanancias'>
      <div className='contenedorTarjeta tarjetaGanancias'>
        <SavingsIcon className='iconoTarjeta'/>
        <div className="contenedorTextoTarjeta">
          <div className='calculoTarjetas tarjetaGanancias'>
            <h1>{calcularSumaGanancias()}<span> usdt</span></h1>
          </div>
          <CardContent className='textoTarjetas'>
            Ganancias Acumuladas
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
