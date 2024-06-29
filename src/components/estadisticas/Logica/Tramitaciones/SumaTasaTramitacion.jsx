// SumaTasaTramitacion.js
import React, { useState, useEffect } from 'react';

export function calcularSumaTasaTramitacion(rows) {
  let suma = 0;
  rows.forEach((row) => {
    suma += parseFloat(row.tasaTramitacion || 0);
  });
  return suma.toFixed(2);
}

export default function SumaTasaTramitacion() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaTasaTramitacion = calcularSumaTasaTramitacion(rows);

  return (
    <div>
      {sumaTasaTramitacion}
    </div>
  );
}
