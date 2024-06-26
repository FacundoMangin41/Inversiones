import React, { useState, useEffect } from 'react';
import "./css/tarjetas.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { startOfWeek, endOfWeek, isSameWeek, max } from 'date-fns';

export default function SumaGananciasUltimaSemana() {
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

  const calcularSumaGananciasUltimaSemana = () => {
    if (rows.length === 0) {
      return "0.00";
    }

    console.log("Rows:", rows);

    // Encontrar la fecha más reciente en los datos
    const fechas = rows.map(row => parseDate(row.fecha));
    console.log("Fechas parsed:", fechas);
    const fechaMasReciente = max(fechas);
    console.log("Fecha más reciente:", fechaMasReciente);

    // Calcular el inicio y fin de la semana más reciente
    const inicioUltimaSemana = startOfWeek(fechaMasReciente, { weekStartsOn: 1 });
    const finUltimaSemana = endOfWeek(fechaMasReciente, { weekStartsOn: 1 });

    console.log("Inicio de la última semana:", inicioUltimaSemana);
    console.log("Fin de la última semana:", finUltimaSemana);

    // Sumar las ganancias de la última semana
    let sumaUltimaSemana = 0;
    rows.forEach((row) => {
      const fecha = parseDate(row.fecha);
      console.log("Fecha de row:", fecha);
      if (isSameWeek(fecha, fechaMasReciente, { weekStartsOn: 1 })) {
        sumaUltimaSemana += parseFloat(row.gananciaDiaria || 0);
        console.log("Suma parcial:", sumaUltimaSemana);
      }
    });

    return sumaUltimaSemana.toFixed(2);
  };

  return (
    <div className='containerTarjetas'>
      <CalendarMonthIcon className='iconoTarjeta'/>
      <div className="contenedorTarjetasInformacion">
        <h1>{calcularSumaGananciasUltimaSemana()}<span> USDT</span></h1>
        <h3>Ganancias de la última semana</h3>
      </div>
    </div>
  );
}
