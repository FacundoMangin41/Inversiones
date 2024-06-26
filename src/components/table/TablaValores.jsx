import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function TablaValores() {
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : [];
  });

  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  const handleExport = () => {
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
    
    const columnWidths = [
      { wch: 15 },
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 35 },
      { wch: 20 },
    ];
    worksheet['!cols'] = columnWidths;

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;

        worksheet[cell_ref].s = {
          fill: {
            fgColor: { rgb: R % 2 === 0 ? 'FFCCCCCC' : 'FFFFFFFF' },
          },
          font: {
            name: 'Arial',
            sz: 12,
            bold: R === 0,
            color: { rgb: R === 0 ? 'FFFFFFFF' : 'FF000000' },
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

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(firstSheet);
      const newRows = importedData.map((row, index) => ({
        ...row,
        id: `imported-${Date.now()}-${index}`
      }));
      setRows((prevRows) => [...prevRows, ...newRows]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleProcessRowUpdate = (newRow) => {
    const gananciaDiaria = parseFloat(newRow.final) - parseFloat(newRow.invertido);
    const tasaTramitacion = parseFloat(newRow.facturacionTotal) - parseFloat(newRow.final);

    const updatedRow = {
      ...newRow,
      gananciaDiaria: gananciaDiaria.toFixed(8),
      tasaTramitacion: tasaTramitacion.toFixed(8),
    };

    setRows((prevRows) => prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
    setEditRowId(null);
    return updatedRow;
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleDeleteClick = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleAddRow = (newRow) => {
    const id = `added-${Date.now()}`;
    const gananciaDiaria = parseFloat(newRow.final).toFixed(8) - parseFloat(newRow.invertido).toFixed(8);
    const tasaTramitacion = parseFloat(newRow.facturacionTotal).toFixed(8) - parseFloat(newRow.final).toFixed(8);

    const rowToAdd = {
      id,
      ...newRow,
      gananciaDiaria: gananciaDiaria.toFixed(8),
      tasaTramitacion: tasaTramitacion.toFixed(8),
    };

    setRows((prevRows) => [...prevRows, rowToAdd]);
  };

  const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 150, editable: true },
    { field: 'moneda', headerName: 'Moneda', width: 130, editable: true },
    { field: 'invertido', headerName: 'USDT Invertido', width: 230, editable: true },
    { field: 'final', headerName: 'USDT Final', width: 280, editable: true },
    { field: 'facturacionTotal', headerName: 'Facturacion Total (con impuestos)', width: 310, editable: true },
    { field: 'tasaTramitacion', headerName: 'Tasa de tramitacion (descuentos)', width: 350, editable: true },
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
                  onClick={() => handleAddRow(params.row)}
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
        Exportar Excel
      </Button>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImport}
        style={{ display: 'none' }}
        id="import-file"
      />
      <label htmlFor="import-file">
        <Button
          variant="contained"
          component="span"
          color="secondary"
          style={{ marginBottom: 10, marginLeft: 10 }}
        >
          Importar Excel
        </Button>
      </label>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={handleProcessRowUpdate}
        components={{ Toolbar: GridToolbar }}
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
