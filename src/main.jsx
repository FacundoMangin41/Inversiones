import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import './index.css'

import { ThemeProvider, createTheme } from "@mui/material";
import { esES } from '@mui/x-data-grid/locales';
import { esES as coreEsES } from '@mui/material/locale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";

const theme = createTheme(
  {},
  esES, // x-data-grid translations
  coreEsES // core translations
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
