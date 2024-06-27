import React from 'react';
import AppEstadisticasGanancias from './AppEstadisticasGanancias';
import AppEstadisticasTramitacion from './AppEstadisticasTramitacion';

const AppEstadisticas = () => {
    return (
        <div className='contenedorEstadisticas'>
            <AppEstadisticasGanancias/>
            <AppEstadisticasTramitacion/>
        </div>
    );
};

export default AppEstadisticas;