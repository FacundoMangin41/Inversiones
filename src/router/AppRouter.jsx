import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from '../layout/Layout';
import TablaPage from "../pages/tabla/AppTabla";
import AppFormulario from "../pages/formulario/AppFormulario";
import AppEstadisticas from "../pages/Estadisticas/AppEstadisticas";


const AppRouter = () => {
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