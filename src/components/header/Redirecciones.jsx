import CreateIcon from '@mui/icons-material/Create';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const iconMap = {
  Formulario: <CreateIcon />,
  'Inversiones': <MonetizationOnIcon />,
  // WhatsApp: <WhatsAppIcon />,
  Linkedin: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
  Facebook: <FacebookIcon />,
  'Estadisticas': <QueryStatsIcon />,
  GitHub: <GitHubIcon />,
};

export const drawerItems = [
  { label: 'Inversiones', path: '/', className: 'drawerItem' },
  { label: 'Formulario', path: '/formulario', className: 'drawerItem' },
  { label: 'Estadisticas', path: '/Estadisticas', className: 'drawerItem' },
];

export const drawerItemsContactos = [
  { label: 'GitHub', path: 'https://github.com/FacundoMangin41', className: 'drawerItem' },
  // { label: 'WhatsApp', path: 'https://api.whatsapp.com/send?phone=543329305304', className: 'drawerItem' },
  { label: 'Linkedin', path: 'https://www.linkedin.com/in/facundo-mangin-65359a268/', className: 'drawerItem' },
  { label: 'Instagram', path: 'https://www.instagram.com/facumangin/', className: 'drawerItem' },
  { label: 'Facebook', path: 'https://www.facebook.com/facundo.mangin/', className: 'drawerItem' },
];

      
     
