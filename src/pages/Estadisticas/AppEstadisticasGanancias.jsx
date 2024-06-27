import * as React from 'react';
import SumaGananciasDiarias from '../../components/target/ganancias/SumaGananciasDiarias';
import SumaGananciasUltimaSemana from '../../components/target/ganancias/SumaGananciasUltimaSemana';
import SumaGananciasUltimoMes from '../../components/target/ganancias/SumaGananciasUltimoMes';
import SumaTasaTramitacion from '../../components/target/tramitacion/SumaTasaTramitacion';
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