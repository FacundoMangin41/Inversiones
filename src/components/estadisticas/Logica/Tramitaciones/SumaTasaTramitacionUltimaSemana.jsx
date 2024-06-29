import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, isSameWeek, max } from 'date-fns';

export function calcularSumaTasaTramitacionUltimaSemana(rows) {
  if (rows.length === 0) {
    return "0.00";
  }

  // Función para parsear la fecha
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Encontrar la fecha más reciente en los datos
  const fechas = rows.map(row => parseDate(row.fecha));
  const fechaMasReciente = max(fechas);

  // Calcular el inicio y fin de la semana más reciente
  const inicioUltimaSemana = startOfWeek(fechaMasReciente, { weekStartsOn: 1 });
  const finUltimaSemana = endOfWeek(fechaMasReciente, { weekStartsOn: 1 });

  // Sumar las tasas de tramitación de la última semana
  let sumaUltimaSemana = 0;
  rows.forEach((row) => {
    const fecha = parseDate(row.fecha);
    if (isSameWeek(fecha, fechaMasReciente, { weekStartsOn: 1 })) {
      sumaUltimaSemana += parseFloat(row.tasaTramitacion || 0);
    }
  });

  return sumaUltimaSemana.toFixed(2);
}

export default function SumaTasaTramitacionUltimaSemana() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaTasaTramitacionUltimaSemana = calcularSumaTasaTramitacionUltimaSemana(rows);

  return (
    <div>
      {sumaTasaTramitacionUltimaSemana}
    </div>
  );
}
