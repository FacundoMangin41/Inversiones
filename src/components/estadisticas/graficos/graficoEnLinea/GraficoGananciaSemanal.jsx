import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import './GraficoEnLinea.css'; // Importar el archivo CSS

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function calcularSumaGananciasPorSemana(rows) {
  if (rows.length === 0) {
    return [];
  }

  const semanas = {};

  rows.forEach(row => {
    const fecha = parseDate(row.fecha);
    const inicioSemana = startOfWeek(fecha, { weekStartsOn: 1 });
    const semanaKey = format(inicioSemana, 'yyyy-MM-dd');

    if (!semanas[semanaKey]) {
      semanas[semanaKey] = { suma: 0, inicioSemana, finSemana: endOfWeek(inicioSemana, { weekStartsOn: 1 }) };
    }

    semanas[semanaKey].suma += parseFloat(row.gananciaDiaria || 0);
  });

  return Object.keys(semanas).map(semanaKey => ({
    semana: semanaKey,
    suma: semanas[semanaKey].suma.toFixed(2),
    inicioSemana: semanas[semanaKey].inicioSemana,
    finSemana: semanas[semanaKey].finSemana,
  }));
}

export default function SumaGananciasUltimaSemana() {
  const [rows, setRows] = useState([]);
  const [sumaSemanal, setSumaSemanal] = useState([]);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      const sumasSemanas = calcularSumaGananciasPorSemana(rows);
      setSumaSemanal(sumasSemanas);
      localStorage.setItem('sumaSemanal', JSON.stringify(sumasSemanas));
    }
  }, [rows]);

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

  const dataForChart = sumaSemanal.map(semana => ({
    week: `Semana del ${format(new Date(semana.inicioSemana), 'dd MMMM yyyy', { locale: es })}`,
    suma: parseFloat(semana.suma),
  }));

  return (
    <div className="containerGrafico">
      <div className="chart-container">
        <BarChart
          dataset={dataForChart}
          xAxis={[{ scaleType: 'band', dataKey: 'week' }]}
          series={[{ dataKey: 'suma', label: 'Ganancias Semanales', valueFormatter }]}
          {...chartSetting}
        />
      </div>
    </div>
  );
}
