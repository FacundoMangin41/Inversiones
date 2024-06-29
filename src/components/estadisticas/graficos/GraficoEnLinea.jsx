import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './GraficoEnLinea.css'; // Asegúrate de importar el archivo CSS

export default function GraficoEnLinea() {
  return (
    <div className="line-chart-container">
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </div>
  );
}