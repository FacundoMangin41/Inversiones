import * as React from 'react';
import SumaGananciasDiarias from '../../components/target/SumaGananciasDiarias';
import SumaGananciasUltimaSemana from '../../components/target/SumaGananciasUltimaSemana';
import "./css/estadistica.css"

export default function AppEstadisticas() {
  
  return (
    <div className='PagesEstadisticas'>
      <div className='pagesTarjetasEstadisticas'>
      <SumaGananciasDiarias /> {/*Mostramos el componente SumaGananciasDiarias*/}
      <SumaGananciasUltimaSemana /> {/*Mostramos el componente SumaGananciasDiarias*/}
      <SumaGananciasDiarias /> {/*Mostramos el componente SumaGananciasDiarias*/}
      </div>

      <div className='pagesTarjetasEstadisticas'>
      <SumaGananciasDiarias /> {/*Mostramos el componente SumaGananciasDiarias*/}
      <SumaGananciasDiarias /> {/*Mostramos el componente SumaGananciasDiarias*/}
      <SumaGananciasDiarias /> {/*Mostramos el componente SumaGananciasDiarias*/}
      </div>
    </div>
  );
}