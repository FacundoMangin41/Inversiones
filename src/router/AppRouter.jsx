import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from '../layout/Layout';
import TablaPage from "../pages/tabla/AppTabla";
import AppFormulario from "../pages/formulario/AppFormulario";
import AppEstadisticas from "../pages/Estadisticas/AppEstadisticas";
import Swal from 'sweetalert2';

const AppRouter = () => {
    useEffect(() => {
        Swal.fire({
            title: '<span style="color: #c24e00; font-weight: BOLD;">¡IMPORTANTE!</span>',
            html: 'Para llevar un correcto control, debe <br><span style="font-size: 20px; font-weight: bold;">"INVERTIR SIEMPRE TODO EL DINERO DE SU CUENTA EN CADA OPERACIÓN"</span> <br>Caso contrario, las estadísticas no serán correctas.',
            icon: "warning"
        });
    }, []);

    return (
        <div>
            <>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route
                            index
                            element={<TablaPage />}
                        />
                        <Route
                            path="/tabla"
                            element={<TablaPage />}
                        />
                        <Route
                            path="/formulario"
                            element={<AppFormulario />}
                        />
                        <Route
                            path="/estadisticas"
                            element={<AppEstadisticas />}
                        />
                    </Route>
                </Routes>
            </>
        </div>
    );
};

export default AppRouter;
