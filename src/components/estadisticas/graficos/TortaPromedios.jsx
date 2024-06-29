// TortaPromedios.js
import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';
import { calcularPromedioGanancias } from "../Logica/Promedios/PromedioTotal";
import { calcularPromedioGananciasUltimaSemana } from "../Logica/Promedios/PromedioUltimaSemana";
import { calcularPromedioGananciasUltimoMes } from "../Logica/Promedios/PromedioUltimoMes";
import "./Torta.css";

export default function TortaPromedios() {
    const [rows, setRows] = useState([]);
    const [promedioTotal, setPromedioTotal] = useState(0);
    const [promedioUltimaSemana, setPromedioUltimaSemana] = useState("0.00");
    const [promedioUltimoMes, setPromedioUltimoMes] = useState("0.00");

    useEffect(() => {
        const savedRows = localStorage.getItem('rows');
        if (savedRows) {
            const parsedRows = JSON.parse(savedRows);
            setRows(parsedRows);
            setPromedioTotal(calcularPromedioGanancias(parsedRows));
            setPromedioUltimaSemana(calcularPromedioGananciasUltimaSemana(parsedRows));
            setPromedioUltimoMes(calcularPromedioGananciasUltimoMes(parsedRows));
        }
    }, []);

    const data = [
        { id: 0, value: parseFloat(promedioTotal), label: `Promedio por dia: ${promedioTotal}`},
        { id: 1, value: parseFloat(promedioUltimaSemana), label: `Promedio de ultima semana: ${promedioUltimaSemana}`},
        { id: 2, value: parseFloat(promedioUltimoMes), label: `Promedio del ultimo mes: ${promedioUltimoMes}` },
    ];

    return (
        <div className="torta-container">
            <h1>Grafico de Promedios</h1>
            <PieChart
                series={[
                    {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      },
                ]}
                height={200}
            />
        </div>
    );
}
