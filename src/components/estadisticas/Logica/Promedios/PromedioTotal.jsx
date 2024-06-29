// PromedioTotal.js
import React, { useState, useEffect } from 'react';

export function calcularPromedioGanancias(rows) {
  let sumaGanancias = 0;
  let count = 0;
  rows.forEach((row) => {
    if (row.gananciaDiaria) {
      sumaGanancias += parseFloat(row.gananciaDiaria);
      count += 1;
    }
  });
  if (count === 0) {
    return 0;
  }
  return (sumaGanancias / count).toFixed(2);
}

export default function PromedioTotal() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const promedio = calcularPromedioGanancias(rows);

  return (
    <div>
      {promedio}
    </div>
  );
}
