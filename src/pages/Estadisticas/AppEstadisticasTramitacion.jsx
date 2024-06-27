import * as React from 'react';

import SumaTasaTramitacion from '../../components/target/tramitacion/SumaTasaTramitacion';
import SumaTasaTramitacionUltimaSemana from '../../components/target/tramitacion/SumaTasaTramitacionUltimaSemana';
import SumaTasaTramitacionUltimoMes from '../../components/target/tramitacion/SumaTasaTramitacionUltimoMes';
import "./css/estadistica.css"
import Divider from '@mui/material/Divider';

export default function AppEstadisticasTramitacion() {

  return (
    <div className='PagesEstadisticas'>        
      <SumaTasaTramitacion /> 
      <SumaTasaTramitacionUltimaSemana/>
      <SumaTasaTramitacionUltimoMes/>

    </div>
  );
}