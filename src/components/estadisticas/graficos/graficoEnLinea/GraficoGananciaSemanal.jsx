import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { es } from 'date-fns/locale';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

export default function SumaGananciasPorSemana() {
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      const parsedRows = JSON.parse(savedRows);
      setRows(parsedRows);

      const uniqueWeeks = [...new Set(parsedRows.map(row => startOfWeek(parseDate(row.fecha), { weekStartsOn: 1 }).toISOString()))]
        .sort((a, b) => new Date(a) - new Date(b));
      setStartDate(uniqueWeeks[0]);
      setEndDate(uniqueWeeks[uniqueWeeks.length - 1]);
    }
  }, []);

  const uniqueWeeks = [...new Set(rows.map(row => startOfWeek(parseDate(row.fecha), { weekStartsOn: 1 }).toISOString()))]
    .sort((a, b) => new Date(a) - new Date(b));

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    if (new Date(newStartDate) > new Date(endDate)) {
      const nextAvailableEndDate = uniqueWeeks.find(date => new Date(date) >= new Date(newStartDate));
      setEndDate(nextAvailableEndDate || newStartDate);
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredEndDates = uniqueWeeks.filter(date => new Date(date) >= new Date(startDate));

  const filteredData = rows.filter((row) => {
    const rowDate = startOfWeek(parseDate(row.fecha), { weekStartsOn: 1 });
    const start = new Date(startDate);
    const end = new Date(endDate);
    return rowDate >= start && rowDate <= end;
  });

  const sumaSemanal = calcularSumaGananciasPorSemana(filteredData);

  const chartSetting = {
    // yAxis: [
    //   {
    //     label: 'Ganancias (USD)',
    //   },
    // ],
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
    <Box sx={{ width: '100%' }}>
      <div className="containerGrafico">
        <div className="chart-container">
          <BarChart
            dataset={dataForChart}
            xAxis={[{ scaleType: 'band', dataKey: 'week' }]}
            series={[{ dataKey: 'suma', label: 'Ganancias Semanales', valueFormatter }]}
            {...chartSetting}
          />
        </div>

        <div className="selectorDeFechas">
          <Typography id="input-date-range" gutterBottom sx={{ color: 'black', padding: ' 0 2rem', fontWeight: '500' }}>
            Selecciona el rango de semanas
          </Typography>

          <div className="fechasGrafico">
            <FormControl fullWidth margin="normal">
              <InputLabel>Semana de inicio</InputLabel>
              <Select
                value={startDate}
                onChange={handleStartDateChange}
              >
                {uniqueWeeks.map((date) => (
                  <MenuItem key={date} value={date}>
                    {`Semana del ${format(new Date(date), 'dd MMMM yyyy', { locale: es })}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Semana de fin</InputLabel>
              <Select
                value={endDate}
                onChange={handleEndDateChange}
              >
                {filteredEndDates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {`Semana del ${format(new Date(date), 'dd MMMM yyyy', { locale: es })}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </Box>
  );
}
