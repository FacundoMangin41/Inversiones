import React from 'react';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkIcon from '@mui/icons-material/Work';
import NearMeIcon from '@mui/icons-material/NearMe';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export const iconMap = {
  Areas: <WorkIcon />,
  Tareas: <ListAltRoundedIcon />,
  'Cargar OT': <NoteAddIcon />,
  'Listado OT': <AutoStoriesIcon />,
  Estadisticas: <LeaderboardRoundedIcon />,
  Usuarios: <ContactPageIcon />,
  Reportes: <SupportAgentIcon />,
  Computadoras: <DesktopWindowsRoundedIcon />,
  Impresoras: <LocalPrintshopRoundedIcon />,
  Rentas: <NearMeIcon />,
  Ayuda: <HelpCenterIcon />,
};

export const drawerItems = [
  { label: 'Areas', path: '/ListaDeAreas', className: 'drawerItem' },
  { label: 'Tareas', path: '/listaTarea', className: 'drawerItem' },
  { label: 'Usuarios', path: '/listaDeUsuarios', className: 'drawerItem' },
  { label: 'Listado OT', path: '/listadoOrdenTrabajo', className: 'drawerItem' },
  { label: 'Cargar OT', path: '/ordenDeTrabajo', className: 'drawerItem' },
  { label: 'Estadisticas', path: '/estadisticas', className: 'drawerItem' },
];

export const drawerItemsReportes = [
  { label: 'Reportes', path: '/reportes', className: 'drawerItem' },
];

export const drawerItemsRentas = [
  { label: 'Rentas', path: '/cargaDatosEfimuni', className: 'drawerItem' },
];

export const drawerItemsAyuda = [
  { label: 'Ayuda', path: '/', className: 'drawerItem' },
];

export const drawerItemsRelevamientos = [
  { label: 'Computadoras', path: '/relevamientoComputadoras', className: 'drawerItem' },
  { label: 'Impresoras', path: '/relevamientoImpresoras', className: 'drawerItem' },
];
