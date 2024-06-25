import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Formulario from '../../components/form/FormularioTabla';
// import SumaGananciasDiarias from '../../components/target/SumaGananciasDiarias';
// import TablaValores from '../../components/table/TablaValores';

export default function AppFormulario() {
    const [rows, setRows] = React.useState(() => {
        const savedRows = localStorage.getItem('rows');
        return savedRows ? JSON.parse(savedRows) : [];
      });
    
      const handleAddRow = (formData) => {
        const newRow = { id: uuidv4(), ...formData };
        const updatedRows = [...rows, newRow];
        setRows(updatedRows);
        localStorage.setItem('rows', JSON.stringify(updatedRows));
      };
    
    
      return (
        <div>
          <Formulario onAdd={handleAddRow} />
          {/* <TablaValores rows={rows} onUpdateRow={handleUpdateRow} onDeleteRow={handleDeleteRow} /> */}
          {/* <SumaGananciasDiarias rows={rows} /> Mostramos el componente SumaGananciasDiarias */}
        </div>
      );
    }