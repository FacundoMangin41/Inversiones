import React, { useState, useEffect } from 'react';
import "../css/tarjetas.css";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { startOfMonth, endOfMonth, isSameMonth, max } from 'date-fns';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function SumaGananciasUltimoMes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Restamos 1 al mes porque los meses en Date van de 0 a 11
  };

  const calcularSumaGananciasUltimoMes = () => {
    if (rows.length === 0) {
      return "0.00";
    }

    console.log("Rows:", rows);

    // Encontrar la fecha más reciente en los datos
    const fechas = rows.map(row => parseDate(row.fecha));
    console.log("Fechas parsed:", fechas);
    const fechaMasReciente = max(fechas);
    console.log("Fecha más reciente:", fechaMasReciente);

    // Calcular el inicio y fin del mes más reciente
    const inicioUltimoMes = startOfMonth(fechaMasReciente);
    const finUltimoMes = endOfMonth(fechaMasReciente);

    console.log("Inicio del último mes:", inicioUltimoMes);
    console.log("Fin del último mes:", finUltimoMes);

    // Sumar las ganancias del último mes
    let sumaUltimoMes = 0;
    rows.forEach((row) => {
      const fecha = parseDate(row.fecha);
      console.log("Fecha de row:", fecha);
      if (isSameMonth(fecha, fechaMasReciente)) {
        sumaUltimoMes += parseFloat(row.gananciaDiaria || 0);
        console.log("Suma parcial:", sumaUltimoMes);
      }
    });

    return sumaUltimoMes.toFixed(2);
  };

  return (

    <Card className='Tarjetas tarjetaGanancias'>
      <div className='contenedorTarjeta tarjetaGanancias'>
        <StickyNote2Icon className='iconoTarjeta' />
        <div className="contenedorTextoTarjeta tarjetaGanancias">
          <div className='calculoTarjetas'>
            <h1>{calcularSumaGananciasUltimoMes()}<span> usdt</span></h1>
          </div>
          <CardContent className='textoTarjetas'>
            Ganancias del último mes
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
