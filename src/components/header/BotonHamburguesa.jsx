import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { drawerItems, drawerItemsContactos, iconMap } from './Redirecciones';
import logo from "../../assets/logo.png";
import Toolbar from '@mui/material/Toolbar';

const BotonHamburguesa = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <div className="imagenPerfil">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <Divider className="divider" />
        <div className="layoutsidebar">
          {drawerItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Link className="drawerItem" to={item.path}>
                <ListItemButton className="navegadorSidebar">
                  <ListItemIcon sx={{ color: "var(--letrasSidebar)" }}>{iconMap[item.label]}</ListItemIcon>
                  <ListItemText primary={item.label} sx={{ color: "var(--letrasSidebar)" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </div>
        <Divider className="divider" />
        <div className="layoutsidebar">
          {drawerItemsContactos.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Link className="drawerItem" to={item.path} target='_blank'>
                <ListItemButton className="navegadorSidebar">
                  <ListItemIcon sx={{ color: "var(--letrasSidebar)" }}>{iconMap[item.label]}</ListItemIcon>
                  <ListItemText primary={item.label} sx={{ color: "var(--letrasSidebar)" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </div>
        <Divider className="divider" />
        <div className="pie-de-pagina">
        <p><span>Programador</span> Facundo Mangin</p>
      </div>
      </List>
    </Box>
  );

  return (
    <div className='BotonHamburguesa'>
      <Button className='BotonHamburguesacolor' onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: 'black', fontSize: '1.5rem' }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default BotonHamburguesa;
