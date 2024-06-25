import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function TablaValores({ rows, onUpdateRow, onDeleteRow }) {
  const [editRowId, setEditRowId] = React.useState(null);

  const handleExport = () => {
    // Define the order of columns for export
    const exportRows = rows.map(({ id, fecha, moneda, invertido, final, facturacionTotal, tasaTramitacion, gananciaDiaria }) => ({
      fecha,
      moneda,
      invertido,
      final,
      facturacionTotal,
      tasaTramitacion,
      gananciaDiaria
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    
    // Set column widths
    const columnWidths = [
      { wch: 15 }, // fecha
      { wch: 10 }, // moneda
      { wch: 20 }, // invertido
      { wch: 20 }, // final
      { wch: 30 }, // facturacionTotal
      { wch: 35 }, // tasaTramitacion
      { wch: 20 }, // gananciaDiaria
    ];
    worksheet['!cols'] = columnWidths;

    // Apply styles to cells
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;

        worksheet[cell_ref].s = {
          fill: {
            fgColor: { rgb: R % 2 === 0 ? 'FFCCCCCC' : 'FFFFFFFF' }, // alternating row colors
          },
          font: {
            name: 'Arial',
            sz: 12,
            bold: R === 0, // bold header row
            color: { rgb: R === 0 ? 'FFFFFFFF' : 'FF000000' }, // white text for header
          },
          alignment: {
            vertical: 'center',
            horizontal: 'center',
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleProcessRowUpdate = (newRow) => {
    const gananciaDiaria = parseFloat(newRow.final) - parseFloat(newRow.invertido);
    const tasaTramitacion = parseFloat(newRow.facturacionTotal) - parseFloat(newRow.final);

    const updatedRow = {
      ...newRow,
      gananciaDiaria: gananciaDiaria.toFixed(8),
      tasaTramitacion: tasaTramitacion.toFixed(8),
    };

    onUpdateRow(updatedRow);
    setEditRowId(null);
    return updatedRow;
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleDeleteClick = (id) => {
    onDeleteRow(id);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 150, editable: true },
    { field: 'moneda', headerName: 'Moneda', width: 130, editable: true },
    { field: 'invertido', headerName: 'USDT Invertido', width: 230, editable: true },
    { field: 'final', headerName: 'USDT Final', width: 280, editable: true },
    { field: 'facturacionTotal', headerName: 'Facturacion Total (con impuestos)', width: 310, editable: true },
    { field: 'tasaTramitacion', headerName: 'Tasa de tramitacion (descuentos)', width: 350, editable: true }, // Adjusted width
    { field: 'gananciaDiaria', headerName: 'Ganancia Diaria', width: 180, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isInEditMode = editRowId === params.id;
        return (
          <>
            {isInEditMode ? (
              <>
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  onClick={() => handleProcessRowUpdate(params.row)}
                  color="primary"
                />
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  onClick={handleCancelClick}
                  color="inherit"
                />
              </>
            ) : (
              <>
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  onClick={() => handleEditClick(params.id)}
                  color="inherit"
                />
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => handleDeleteClick(params.id)}
                  color="secondary"
                />
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: '76vh', width: '100%' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExport}
        style={{ marginBottom: 10 }}
      >
        Export to Excel
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        isCellEditable={(params) => editRowId === params.id}
        sx={{
          backgroundColor: '#fff',
          '& .MuiDataGrid-container--top [role=row]': {
            backgroundColor: 'var(--tablaValores)', // Color de fondo negro para el encabezado de la tabla
            color: '', // Color de texto blanco para el encabezado
          },
        }}
      />
    </Box>
  );
}
