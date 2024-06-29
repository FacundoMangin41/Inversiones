// SumaGananciasUltimoMes.js
import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, isSameMonth, max } from 'date-fns';

export function calcularSumaGananciasUltimoMes(rows) {
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Restamos 1 al mes porque los meses en Date van de 0 a 11
  };

  if (rows.length === 0) {
    return "0.00";
  }

  // Encontrar la fecha más reciente en los datos
  const fechas = rows.map(row => parseDate(row.fecha));
  const fechaMasReciente = max(fechas);

  // Calcular el inicio y fin del mes más reciente
  const inicioUltimoMes = startOfMonth(fechaMasReciente);
  const finUltimoMes = endOfMonth(fechaMasReciente);

  // Sumar las ganancias del último mes
  let sumaUltimoMes = 0;
  rows.forEach((row) => {
    const fecha = parseDate(row.fecha);
    if (isSameMonth(fecha, fechaMasReciente)) {
      sumaUltimoMes += parseFloat(row.gananciaDiaria || 0);
    }
  });

  return sumaUltimoMes.toFixed(2);
}

export default function SumaGananciasUltimoMes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaGanancias = calcularSumaGananciasUltimoMes(rows);

  return (
    <div>
      {sumaGanancias}
    </div>
  );
}
