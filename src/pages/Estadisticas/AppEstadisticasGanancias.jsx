import * as React from 'react';
import SumaGananciasDiarias from '../../components/target/SumaGananciasDiarias';
import SumaGananciasUltimaSemana from '../../components/target/SumaGananciasUltimaSemana';
import SumaGananciasUltimoMes from '../../components/target/SumaGananciasUltimoMes';
import SumaTasaTramitacion from '../../components/target/SumaTasaTramitacion';
import "./css/estadistica.css"
import Divider from '@mui/material/Divider';

export default function AppEstadisticasGanancias() {

  return (
    <div className='PagesEstadisticas'>        
        <SumaGananciasDiarias /> 
        <SumaGananciasUltimaSemana />
        <SumaGananciasUltimoMes />


      {/* <SumaTasaTramitacion />  */}
      {/* <SumaGananciasDiarias /> 
      <SumaGananciasDiarias />  */}

    </div>
  );
}