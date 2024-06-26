import * as React from 'react';
import SumaGananciasDiarias from '../../components/target/SumaGananciasDiarias';
import SumaGananciasUltimaSemana from '../../components/target/SumaGananciasUltimaSemana';
import SumaGananciasUltimoMes from '../../components/target/SumaGananciasUltimoMes';
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

      {/* <div className='pagesTarjetasEstadisticas'>
      <SumaGananciasDiarias /> 
      <SumaGananciasDiarias /> 
      <SumaGananciasDiarias /> 
      </div> */}
    </div>
  );
}