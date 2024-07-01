import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import './GraficoEnLinea.css'; // Importar el archivo CSS

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export default function GananciasDiarias() {
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      const parsedRows = JSON.parse(savedRows);
      setRows(parsedRows);

      const uniqueDates = [...new Set(parsedRows.map(row => row.fecha))].sort((a, b) => parseDate(a) - parseDate(b));
      setStartDate(uniqueDates[0]);
      setEndDate(uniqueDates[uniqueDates.length - 1]);
    }
  }, []);

  const uniqueDates = [...new Set(rows.map(row => row.fecha))].sort((a, b) => parseDate(a) - parseDate(b));

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

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    // Si la fecha de fin es anterior a la nueva fecha de inicio, actualizar la fecha de fin
    if (parseDate(newStartDate) > parseDate(endDate)) {
      const nextAvailableEndDate = uniqueDates.find(date => parseDate(date) >= parseDate(newStartDate));
      setEndDate(nextAvailableEndDate || newStartDate);
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredEndDates = uniqueDates.filter(date => parseDate(date) >= parseDate(startDate));

  const filteredData = rows.filter((row) => {
    const rowDate = parseDate(row.fecha);
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    return rowDate >= start && rowDate <= end;
  });

  const dataForChart = filteredData.map((row) => ({
    fecha: format(parseDate(row.fecha), 'dd MMMM yyyy', { locale: es }),
    ganancia: parseFloat(row.gananciaDiaria || 0),
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <div className="containerGrafico">
        <div className="chart-container">
          <BarChart
            dataset={dataForChart}
            xAxis={[{ scaleType: 'band', dataKey: 'fecha' }]}
            series={[{ dataKey: 'ganancia', label: 'Ganancias Diarias', valueFormatter }]}
            skipAnimation={skipAnimation}
            {...chartSetting}
          />
        </div>
        {/* <FormControlLabel sx={{ color: 'black', padding: ' 0 2rem' }}
          checked={skipAnimation}
          control={
            <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
          }
          label="skipAnimation"
          labelPlacement="end"
        /> */}

        <div className="selectorDeFechas">
          <Typography id="input-date-range" gutterBottom sx={{ color: 'black', padding: ' 0 2rem', fontWeight: '500' }}>
            Selecciona el rango de fechas
          </Typography>

          <div className="fechasGrafico">
            <FormControl fullWidth margin="normal">
              <InputLabel>Fecha de inicio</InputLabel>
              <Select
                value={startDate}
                onChange={handleStartDateChange}
              >
                {uniqueDates.map((date) => (
                  <MenuItem key={date} value={date}>{date}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Fecha de fin</InputLabel>
              <Select
                value={endDate}
                onChange={handleEndDateChange}
              >
                {filteredEndDates.map((date) => (
                  <MenuItem key={date} value={date}>{date}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </Box>
  );
}
