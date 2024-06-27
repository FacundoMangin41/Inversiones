import React from 'react';
import AppEstadisticasGanancias from './AppEstadisticasGanancias';
import AppEstadisticasTramitacion from './AppEstadisticasTramitacion';
import AppPromedio from './AppPromedio';

const AppEstadisticas = () => {
    return (
        <div className='contenedorEstadisticas'>
            <AppEstadisticasGanancias/>
            <AppPromedio/>
            <AppEstadisticasTramitacion/>
        </div>
    );
};

export default AppEstadisticas;