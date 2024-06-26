import * as React from 'react';
import SumaGananciasDiarias from '../../components/target/SumaGananciasDiarias';
import SumaGananciasUltimaSemana from '../../components/target/SumaGananciasUltimaSemana';
import SumaGananciasUltimoMes from '../../components/target/SumaGananciasUltimoMes';
import SumaTasaTramitacion from '../../components/target/SumaTasaTramitacion';
import "./css/estadistica.css"

export default function AppEstadisticas() {

  return (
    <div className='PagesEstadisticas'>
      <div className='pagesTarjetasEstadisticas'>
        <SumaGananciasDiarias />
        <SumaGananciasUltimaSemana />
        <SumaGananciasUltimoMes />
        {/* <SumaGananciasDiarias />  */}
      </div>

      <div className='pagesTarjetasEstadisticas'>
      <SumaTasaTramitacion /> 
      {/* <SumaGananciasDiarias /> 
      <SumaGananciasDiarias />  */}
      </div>
    </div>
  );
}