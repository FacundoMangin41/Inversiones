import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const inputStyle = {
  backgroundColor: 'var(--fondoContenedoresFormulario)',
  marginRight: 2,
  borderRadius: 1, // Radio de borde
};

export default function FormularioTabla({ onAdd }) {
  const [formData, setFormData] = React.useState({
    fecha: '',
    moneda: '',
    invertido: '',
    final: '',
    facturacionTotal: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ marginBottom: 20 }}>
      <TextField
        label="Fecha"
        name="fecha"
        value={formData.fecha}
        onChange={handleInputChange}
        variant="outlined"
        required
        sx={{ ...inputStyle, width: '10rem' }} // Ancho específico para fecha
      />
      <TextField
        label="Moneda"
        name="moneda"
        value={formData.moneda}
        onChange={handleInputChange}
        variant="outlined"
        required
        sx={{ ...inputStyle, width: '10rem' }} // Ancho específico para moneda
      />
      <TextField
        label="USDT Invertido"
        name="invertido"
        value={formData.invertido}
        onChange={handleInputChange}
        variant="outlined"
        required
        sx={{ ...inputStyle, width: '250px' }} // Ancho específico para USDT Invertido
      />
      <TextField
        label="USDT Final (con impuestos)"
        name="final"
        value={formData.final}
        onChange={handleInputChange}
        variant="outlined"
        required
        sx={{ ...inputStyle, width: '300px' }} // Ancho específico para USDT Final
      />
      <TextField
        label="Facturacion Total (con impuestos)"
        name="facturacionTotal"
        value={formData.facturacionTotal}
        onChange={handleInputChange}
        variant="outlined"
        required
        sx={{ ...inputStyle, width: '350px' }} // Ancho específico para Facturacion Total
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}
