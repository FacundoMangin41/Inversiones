// PromedioUltimoMes.js
import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, isSameMonth, max } from 'date-fns';

export function calcularPromedioGananciasUltimoMes(rows) {
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

  // Filtrar las filas que están dentro del último mes
  const filasUltimoMes = rows.filter(row => {
    const fecha = parseDate(row.fecha);
    return isSameMonth(fecha, fechaMasReciente);
  });

  // Sumar las ganancias del último mes y contar las filas
  const sumaGanancias = filasUltimoMes.reduce((total, row) => total + parseFloat(row.gananciaDiaria || 0), 0);
  const cantidadFilas = filasUltimoMes.length;

  // Calcular el promedio
  const promedioGanancias = cantidadFilas ? (sumaGanancias / cantidadFilas).toFixed(2) : "0.00";

  return promedioGanancias;
}

export default function PromedioUltimoMes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const promedio = calcularPromedioGananciasUltimoMes(rows);

  return (
    <div>
      {promedio}
    </div>
  );
}
