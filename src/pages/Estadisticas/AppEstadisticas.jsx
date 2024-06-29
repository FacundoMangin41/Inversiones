import React from 'react';
// import AppEstadisticasGanancias from './AppEstadisticasGanancias';
// import AppEstadisticasTramitacion from './AppEstadisticasTramitacion';
// import AppPromedio from './AppPromedio';
import EstadisticasPrincipal from '../../components/estadisticas/EstadisticasPrincipal';
import "./css/estadistica.css"

const AppEstadisticas = () => {
    return (
        <div className='contenedorEstadisticas'>
            <EstadisticasPrincipal/>
        </div>
    );
};

export default AppEstadisticas;