import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
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
  return new Date(year, month - 1, day); // Restamos 1 al mes porque los meses en Date van de 0 a 11
}

function calcularSumaGananciasUltimoMes(rows) {
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      const parsedRows = JSON.parse(savedRows);
      setRows(parsedRows);

      const uniqueMonths = [...new Set(parsedRows.map(row => startOfMonth(parseDate(row.fecha)).toISOString()))]
        .sort((a, b) => new Date(a) - new Date(b));
      setStartDate(uniqueMonths[0]);
      setEndDate(uniqueMonths[uniqueMonths.length - 1]);
    }
  }, []);

  const uniqueMonths = [...new Set(rows.map(row => startOfMonth(parseDate(row.fecha)).toISOString()))]
    .sort((a, b) => new Date(a) - new Date(b));

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    if (new Date(newStartDate) > new Date(endDate)) {
      const nextAvailableEndDate = uniqueMonths.find(date => new Date(date) >= new Date(newStartDate));
      setEndDate(nextAvailableEndDate || newStartDate);
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredEndDates = uniqueMonths.filter(date => new Date(date) >= new Date(startDate));

  const filteredData = rows.filter((row) => {
    const rowDate = startOfMonth(parseDate(row.fecha));
    const start = new Date(startDate);
    const end = new Date(endDate);
    return rowDate >= start && rowDate <= end;
  });

  const sumaMensual = calcularSumaGananciasUltimoMes(filteredData);

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

  const dataForChart = sumaMensual.map(mes => ({
    month: `Mes de ${format(new Date(mes.inicioMes), 'MMMM yyyy', { locale: es })}`,
    suma: parseFloat(mes.suma),
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <div className="containerGrafico">
        <div className="chart-container">
          <BarChart
            dataset={dataForChart}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[{ dataKey: 'suma', label: 'Ganancias Mensuales', valueFormatter }]}
            {...chartSetting}
            sx={{ ...chartSetting.sx, width: '100%' }} // Ajustar el ancho del gráfico al 100%
            className="month-chart" // Aplicar la clase CSS para estilos específicos del gráfico del mes
          />
        </div>

        <div className="selectorDeFechas">
          <Typography id="input-date-range" gutterBottom sx={{ color: 'black', padding: '0 2rem', fontWeight: '500' }}>
            Selecciona el rango de meses
          </Typography>

          <div className="fechasGrafico">
            <FormControl fullWidth margin="normal">
              <InputLabel>Mes de inicio</InputLabel>
              <Select
                value={startDate}
                onChange={handleStartDateChange}
              >
                {uniqueMonths.map((date) => (
                  <MenuItem key={date} value={date}>
                    {`Mes de ${format(new Date(date), 'MMMM yyyy', { locale: es })}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Mes de fin</InputLabel>
              <Select
                value={endDate}
                onChange={handleEndDateChange}
              >
                {filteredEndDates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {`Mes de ${format(new Date(date), 'MMMM yyyy', { locale: es })}`}
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
