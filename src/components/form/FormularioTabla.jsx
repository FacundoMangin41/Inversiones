import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import "./css/formularioTabla.css"
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const inputStyle = {
  backgroundColor: 'var(--fondoContenedoresFormulario)',
  marginRight: 2,
  borderRadius: 1,
};

const monedas = ['BTC', 'ETH', 'TRX', 'SOL', 'SHX', 'BNB', 'ACRIS', 'BY', 'AVAX', 'XBH', 'FIL',
  'BTAR', 'DOT', 'UNIT', 'RADF  ETC', 'SOX', 'ADA', 'FAU', 'XLM', 'CMR', 'DOGE', 'ZXQ', 'UNIBOT',
  'MRF', 'MATIC', 'ENGR', 'DTQ', 'LTC', 'SHIB'];

export default function FormularioTabla({ onAdd }) {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    fecha: dayjs().format('DD/MM/YYYY'), // Establece la fecha predeterminada al día actual
    moneda: '',
    invertido: '',
    final: '',
    facturacionTotal: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const USDTFinal = localStorage.getItem('USDTFinal');
    if (USDTFinal) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        invertido: USDTFinal,
      }));
    }
  }, []);

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

  const handleDatePickerChange = (date) => {
    if (date) {
      setFormData({
        ...formData,
        fecha: date.format('DD/MM/YYYY'),
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { final, invertido } = formData;
    const gananciaDiaria = parseFloat(final) - parseFloat(invertido);
    const tasaTramitacion = parseFloat(final) * 1.01005912185827 / 100;

    const newData = {
      ...formData,
      gananciaDiaria: parseFloat(gananciaDiaria.toFixed(4)),
      tasaTramitacion: parseFloat(tasaTramitacion.toFixed(4)),
    };

    onAdd(newData);

    setFormData({
      fecha: dayjs().format('DD/MM/YYYY'), // Restablece la fecha al día actual
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
          <h1>Registrar Inversión</h1>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              className="selector-fecha"
              format="DD/MM/YYYY"
              value={dayjs(formData.fecha, 'DD/MM/YYYY')} // Convierta a objeto Dayjs
              onChange={handleDatePickerChange}
              label="Fecha"
              required
              sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0 }}
            />
          </DemoContainer>
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
                sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0 }}
              />
            )}
          />
          <TextField
            label="Activos (Antes de ser invertidos)"
            name="invertido"
            value={formData.invertido}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0 }}
          />
          <TextField
            label="Activos (Despues de ser invertidos)"
            name="final"
            value={formData.final}
            onChange={handleInputChange}
            variant="outlined"
            required
            type="number"
            sx={{ ...inputStyle, width: 'clamp(10rem, 22rem, 80vw)', margin: 0 }}
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
          zIndex: 9999,
        }}>
          <CircularProgress size={80} color="secondary" />
        </div>
      )}
    </div>
  );
}
