// SumaTasaTramitacionUltimoMes.js
import React, { useState, useEffect } from 'react';

export function calcularSumaTasaTramitacionUltimoMes(rows) {
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
}

export default function SumaTasaTramitacionUltimoMes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaTasaTramitacionUltimoMes = calcularSumaTasaTramitacionUltimoMes(rows);

  return (
    <div>
      {sumaTasaTramitacionUltimoMes}
    </div>
  );
}
