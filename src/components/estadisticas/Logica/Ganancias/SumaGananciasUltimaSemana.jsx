// SumaGananciasUltimaSemana.js
import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, isSameWeek, max } from 'date-fns';

export function calcularSumaGananciasUltimaSemana(rows) {
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

  // Sumar las ganancias de la última semana
  let sumaUltimaSemana = 0;
  rows.forEach((row) => {
    const fecha = parseDate(row.fecha);
    if (isSameWeek(fecha, fechaMasReciente, { weekStartsOn: 1 })) {
      sumaUltimaSemana += parseFloat(row.gananciaDiaria || 0);
    }
  });

  return sumaUltimaSemana.toFixed(2);
}

export default function SumaGananciasUltimaSemana() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaGanancias = calcularSumaGananciasUltimaSemana(rows);

  return (
    <div>
      {sumaGanancias}
    </div>
  );
}
