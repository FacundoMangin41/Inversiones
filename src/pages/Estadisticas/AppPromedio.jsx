import * as React from 'react';
import PromedioTotal from '../../components/target/promedio/PromedioTotal';
import PromedioUltimaSemana from '../../components/target/promedio/PromedioUltimaSemana';
import PromedioUltimoMes from '../../components/target/promedio/PromedioUltimoMes';
import "./css/estadistica.css"
import Divider from '@mui/material/Divider';

export default function AppPromedioTotal() {

  return (
    <div className='PagesEstadisticas'>        
        <PromedioTotal /> 
        <PromedioUltimaSemana/>
        <PromedioUltimoMes/>
    </div>
  );
}