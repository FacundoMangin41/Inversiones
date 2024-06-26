import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import "./css/formularioTabla.css"
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const inputStyle = {
  backgroundColor: 'var(--fondoContenedoresFormulario)',
  marginRight: 2,
  borderRadius: 1, // Radio de borde
};

const monedas = ['BTC', 'ETH', 'TRX', 'SOL', 'SHX', 'BNB', 'ACRIS', 'BY', 'AVAX', 'XBH', 'FIL', 
  'BTAR', 'DOT', 'UNIT', 'RADF  ETC', 'SOX', 'ADA', 'FAU', 'XLM', 'CMR', 'DOGE', 'ZXQ', 'UNIBOT', 
  'MRF', 'MATIC', 'ENGR', 'DTQ', 'LTC', 'SHIB'];

export default function FormularioTabla({ onAdd }) {

  const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState({
    fecha: '',
    moneda: '',
    invertido: '',
    final: '',
    facturacionTotal: '',
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAutocompleteChange = (event, newValue) => {
    setFormData({
      ...formData,
      moneda: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { final, invertido, facturacionTotal } = formData;
    const gananciaDiaria = parseFloat(final) - parseFloat(invertido);
    const tasaTramitacion = parseFloat(facturacionTotal) - parseFloat(final);
    
    const newData = {
      ...formData,
      gananciaDiaria: parseFloat(gananciaDiaria.toFixed(8)),
      tasaTramitacion: parseFloat(tasaTramitacion.toFixed(8)),
    };
    
    onAdd(newData);
    
    setFormData({
      fecha: '',
      moneda: '',
      invertido: '',
      final: '',
      facturacionTotal: '',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/tabla");
    }, 1000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleFormSubmit} style={{ marginBottom: 20 }} className='formularioTabla'>
        <div className="recuadroFormulario">
          <h1>Registrar Inversion</h1>
          <TextField
            label="Fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            variant="outlined"
            required
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0}} // Ancho específico para fecha
          />
          <Autocomplete
            freeSolo
            options={monedas}
            value={formData.moneda}
            onChange={handleAutocompleteChange}
            onInputChange={(event, newInputValue) => {
              setFormData({
                ...formData,
                moneda: newInputValue,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Moneda"
                name="moneda"
                variant="outlined"
                required
                sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0}} // Ancho específico para moneda
              />
            )}
          />
          <TextField
            label="USDT Invertido"
            name="invertido"
            value={formData.invertido}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0}} // Ancho específico para USDT Invertido
          />
          <TextField
            label="USDT Final (con impuestos)"
            name="final"
            value={formData.final}
            onChange={handleInputChange}
            variant="outlined"
            required
            type="number"
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0}} // Ancho específico para USDT Final
          />
          <TextField
            label="Facturacion Total (con impuestos)"
            name="facturacionTotal"
            value={formData.facturacionTotal}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0 }} // Ancho específico para Facturacion Total
          />
          <Button type="submit" variant="contained" color="secondary" className='botonFormulario' disabled={isSubmitting}>
            <SaveIcon />Guardar
          </Button>
        </div>
      </form>
      {isSubmitting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'var(--fondoCirculoEspera)',
          zIndex: 9999,
        }}>
          <CircularProgress size={80} color="secondary" />
        </div>
      )}
    </div>
  );
}
