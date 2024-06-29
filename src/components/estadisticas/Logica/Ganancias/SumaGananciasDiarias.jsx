// SumaGananciasDiarias.js
import React, { useState, useEffect } from 'react';

export function calcularSumaGanancias(rows) {
  let suma = 0;
  rows.forEach((row) => {
    suma += parseFloat(row.gananciaDiaria || 0);
  });
  return suma.toFixed(2);
}

export default function SumaGananciasDiarias() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const sumaGanancias = calcularSumaGanancias(rows);

  return (
    <div>
      {sumaGanancias}
    </div>
  );
}
