import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function calcularSumaGananciasPorMes(rows) {
  if (rows.length === 0) {
    return [];
  }

  const meses = {};

  rows.forEach(row => {
    const fecha = parseDate(row.fecha);
    const inicioMes = startOfMonth(fecha);
    const mesKey = format(inicioMes, 'yyyy-MM');

    if (!meses[mesKey]) {
      meses[mesKey] = { suma: 0, inicioMes, finMes: endOfMonth(inicioMes) };
    }

    meses[mesKey].suma += parseFloat(row.gananciaDiaria || 0);
  });

  return Object.keys(meses).map(mesKey => ({
    mes: mesKey,
    suma: meses[mesKey].suma.toFixed(2),
    inicioMes: meses[mesKey].inicioMes,
    finMes: meses[mesKey].finMes,
  }));
}

export default function SumaGananciasUltimoMes() {
  const [rows, setRows] = useState([]);
  const [sumaMensual, setSumaMensual] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      const sumasMeses = calcularSumaGananciasPorMes(rows);
      setSumaMensual(sumasMeses);
      localStorage.setItem('sumaMensual', JSON.stringify(sumasMeses));
    }
  }, [rows]);

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

  const dataForChart = sumaMensual.map((mes, index) => ({
    month: `Mes ${index + 1}`,
    suma: parseFloat(mes.suma),
  }));

  return (
    <div>
      <BarChart
        dataset={dataForChart}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'suma', label: 'Ganancias Mensuales', valueFormatter }]}
        {...chartSetting}
      />
    </div>
  );
}
