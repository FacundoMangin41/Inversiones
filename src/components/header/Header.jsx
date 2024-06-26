import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import "./css/header.css";
import BotonHamburguesa from "../header/BotonHamburguesa";
import logo from "../../assets/logo.png";

import Button from '@mui/material/Button';



export default function ButtonAppBar() {
  const [isNavVisible, setIsNavVisible] = React.useState(true);


  const location = useLocation();


  React.useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsNavVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <div position="fixed" >
        <div className="sideBar">
          <div className="botonHamburguesaCelular">
            <div className="botonHamburguesaSidebar">
              <BotonHamburguesa />
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '600' }}>
              Control de inversiones
            </Typography>
          </div>

          <div className="sidebarPc">
            <nav className="buscadoresSidebarPc" data-navbar>

              
              <div className={`portafolioSidebarPc ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to="/" className="buscadoresSidebarPc-link"><img src={logo} alt="" />Control de inversiones</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to="/" className="buscadoresSidebarPc-link">Inversiones</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/formulario' ? 'active' : ''}`}>
                <Link to="/formulario" className="buscadoresSidebarPc-link">Registrar Inversión</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/estadisticas' ? 'active' : ''}`}>
                <Link to="/estadisticas" className="buscadoresSidebarPc-link">Estadisticas</Link>
              </div>

              {/* <BotonRedesSociales/> */}

            </nav>
          </div>
        </div>
      </div>
    </Box>
  );
}
