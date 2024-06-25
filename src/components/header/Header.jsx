import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import "./css/header.css";

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
      <AppBar position="fixed" style={{ top: isNavVisible ? 0 : -64, transition: 'top 0.6s' }}>
        <Toolbar className="sideBar">
          <div className="botonHamburguesaCelular">
            <div className="botonHamburguesaSidebar">
              {/* <BotonHamburguesa /> */}
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '600' }}>
              PORTAFOLIO
            </Typography>
          </div>

          <div className="sidebarPc">
            <nav className="buscadoresSidebarPc" data-navbar>

              <div className={`portafolioSidebarPc ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to="/" className="buscadoresSidebarPc-link">PORTAFOLIO</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/formulario' ? 'active' : ''}`}>
                <Link to="/formulario" className="buscadoresSidebarPc-link">Formulario</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/habilidades' ? 'active' : ''}`}>
                <Link to="/habilidades" className="buscadoresSidebarPc-link">Habilidades</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/proyectos' ? 'active' : ''}`}>
                <Link to="/proyectos" className="buscadoresSidebarPc-link">Proyectos</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/experiencia-laboral' ? 'active' : ''}`}>
                <Link to="/experiencia-laboral" className="buscadoresSidebarPc-link">Exp Laboral</Link>
              </div>

              <div className={`buscadoresSidebarPc-link ${location.pathname === '/cursos' ? 'active' : ''}`}>
                <Link to="/cursos" className="buscadoresSidebarPc-link">Certificaciones</Link>
              </div>

              {/* <BotonRedesSociales/> */}

            </nav>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: '120px' }}></div>
    </Box>
  );
}
