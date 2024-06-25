import React from 'react';

export default function SumaGananciasDiarias({ rows }) {
  const calcularSumaGanancias = () => {
    let suma = 0;
    rows.forEach((row) => {
      suma += parseFloat(row.gananciaDiaria || 0);
    });
    return suma.toFixed(2);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Suma de Ganancias Diarias:</h3>
      <p>{calcularSumaGanancias()}</p>
    </div>
  );
}
