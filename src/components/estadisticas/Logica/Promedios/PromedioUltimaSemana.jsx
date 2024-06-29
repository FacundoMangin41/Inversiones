// PromedioUltimaSemana.js
import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, isSameWeek, max } from 'date-fns';

export function calcularPromedioGananciasUltimaSemana(rows) {
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

  // Calcular el inicio y fin de la semana más reciente
  const inicioUltimaSemana = startOfWeek(fechaMasReciente, { weekStartsOn: 1 });
  const finUltimaSemana = endOfWeek(fechaMasReciente, { weekStartsOn: 1 });

  // Filtrar las filas que están dentro de la última semana
  const filasUltimaSemana = rows.filter(row => {
    const fecha = parseDate(row.fecha);
    return isSameWeek(fecha, fechaMasReciente, { weekStartsOn: 1 });
  });

  // Sumar las ganancias de la última semana y contar las filas
  const sumaGanancias = filasUltimaSemana.reduce((total, row) => total + parseFloat(row.gananciaDiaria || 0), 0);
  const cantidadFilas = filasUltimaSemana.length;

  // Calcular el promedio
  const promedioGanancias = cantidadFilas ? (sumaGanancias / cantidadFilas).toFixed(2) : "0.00";

  return promedioGanancias;
}

export default function PromedioUltimaSemana() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const promedio = calcularPromedioGananciasUltimaSemana(rows);

  return (
    <div>
      {promedio}
    </div>
  );
}
