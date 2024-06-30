import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import './GraficoEnLinea.css'; // Importar el archivo CSS

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export default function GananciasDiarias() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: 'Ganancias (USD)',
      },
    ],
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `$${value}`;

  const dataForChart = rows.map((row) => ({
    fecha: format(parseDate(row.fecha), 'dd MMMM yyyy', { locale: es }),
    ganancia: parseFloat(row.gananciaDiaria || 0),
  }));

  return (
    <div className="containerGrafico">
      <div className="chart-container">
        <BarChart
          dataset={dataForChart}
          xAxis={[{ scaleType: 'band', dataKey: 'fecha' }]}
          series={[{ dataKey: 'ganancia', label: 'Ganancias Diarias', valueFormatter }]}
          {...chartSetting}
        />
      </div>
    </div>
  );
}
