import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

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
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `$${value}`;

  const dataForChart = rows.map((row) => ({
    fecha: format(parseDate(row.fecha), 'dd/MM/yyyy'),
    ganancia: parseFloat(row.gananciaDiaria || 0),
  }));

  return (
    <div>
      <BarChart
        dataset={dataForChart}
        xAxis={[{ scaleType: 'band', dataKey: 'fecha' }]}
        series={[{ dataKey: 'ganancia', label: 'Ganancias Diarias', valueFormatter }]}
        {...chartSetting}
      />
    </div>
  );
}
