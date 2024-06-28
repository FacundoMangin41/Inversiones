import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import './css/tablaValores.css';
import Swal from 'sweetalert2';

export default function TablaValores() {

  const handleDeleteAllRows = () => {
    Swal.fire({
      title: "Eliminar registro de datos",
      text: "Se eliminara permanentemente todo el registro de datos que tienes almacenado ¿Estas seguro de hacerlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--botonConfirmarEliminar)",
      cancelButtonColor: "var(--botonCancelarEliminar)",
      confirmButtonText: "Elimínar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setRows([]);
        Swal.fire({
          title: "¡Eliminado!",
          text: "El restro de inversiones fue Eliminado",
          icon: "success"
        });
      }
    });
  };

  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : [];
  });

  const [editRowId, setEditRowId] = useState(null);

  // useEffect para cargar el valor de USDTFinal del localStorage en el campo de USDT Invertido
  React.useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
    if (rows.length > 0) {
      localStorage.setItem('USDTFinal', rows[rows.length - 1].final);
    }
  }, [rows]);

  const handleExport = () => {
    const exportRows = rows.map(({ id, fecha, moneda, invertido, final, gananciaDiaria, facturacionTotal, tasaTramitacion }) => ({
      fecha,
      moneda,
      invertido,
      final,
      gananciaDiaria,
      facturacionTotal,
      tasaTramitacion
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    const columnWidths = [
      { wch: 15 },
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 35 },
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
    XLSX.writeFile(workbook, "Control de inversiones.xlsx");
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
      setRows((prevRows) => {
        const updatedRows = [...prevRows, ...newRows];

        // Verificar y convertir las fechas
        const mostRecentRow = updatedRows.reduce((latest, row) => {
          // Formatear fecha para que la comparacion no falle 
          const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day); // Month is 0-indexed in JS
          };
          const rowDate = parseDate(row.fecha);
          const latestDate = parseDate(latest.fecha);
          return rowDate > latestDate ? row : latest;
        }, updatedRows[0]);

        // console.log('Most recent row:', mostRecentRow);
        // Guardar en sessionStorage el valor de row.final
        if (mostRecentRow && mostRecentRow.final) {
          localStorage.setItem('USDTFinal', mostRecentRow.final);
          // console.log('Saved to sessionStorage:', mostRecentRow.final);
        }
        return updatedRows;
      });
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--botonConfirmarEliminar)",
      cancelButtonColor: "var(--botonCancelarEliminar)",
      confirmButtonText: "Elimínar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        Swal.fire({
          title: "¡Eliminado!",
          text: "La fila fue eliminada",
          icon: "success"
        });
      }
    });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  // const handleAddRow = (newRow) => {
  //   const id = `added-${Date.now()}`;
  //   const gananciaDiaria = parseFloat(newRow.final).toFixed(8) - parseFloat(newRow.invertido).toFixed(8);
  //   const tasaTramitacion = parseFloat(newRow.facturacionTotal).toFixed(8) - parseFloat(newRow.final).toFixed(8);

  //   const rowToAdd = {
  //     id,
  //     ...newRow,
  //     gananciaDiaria: gananciaDiaria.toFixed(8),
  //     tasaTramitacion: tasaTramitacion.toFixed(8),
  //   };

  //   setRows((prevRows) => [...prevRows, rowToAdd]);
  // };
  const handleAddRow = (updatedRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
  };


  const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 150, editable: true, },
    { field: 'moneda', headerName: 'Moneda', width: 130, editable: true },
    {
      field: 'invertido', headerName: 'USDT Invertido', width: 230, editable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          // color={params.value === 'Realizado' ? 'success' : 'warning'}
          sx={{
            backgroundColor: 'var(--usdtInvertido)',
            fontWeight: 'bold',
            width: '100%',
          }}
        />
      ),
    },
    {
      field: 'final', headerName: 'Activos Totales (USDT)', width: 230, editable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          // color={params.value === 'Realizado' ? 'success' : 'warning'}
          sx={{
            backgroundColor: 'var(--usdtFinal)',
            fontWeight: 'bold',
            width: '100%',
          }}
        />
      ),
    },
    {
      field: 'gananciaDiaria', headerName: 'Ganancia Diaria', width: 180, editable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          // color={params.value === 'Realizado' ? 'success' : 'warning'}
          sx={{
            backgroundColor: 'var(--gananciaDiaria)',
            fontWeight: 'bold',
            width: '100%',
          }}
        />
      ),
    },
    { field: 'facturacionTotal', headerName: 'Facturacion Total (con impuestos)', width: 310, editable: true },
    { field: 'tasaTramitacion', headerName: 'Tasa de tramitacion (descuentos)', width: 350, editable: true },
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
    <Box sx={{ height: 'clamp(10rem, 76rem, 78vh)', marginBottom: '2rem', width: '100%' }} className='botonesInvercionesCantainer'>
      <div className="botonesInvercionescontenedor">
        <Button className='botonTabla'
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
          <Button className='botonTabla'
            variant="contained"
            component="span"
            color="secondary"
            style={{ marginBottom: 10, marginLeft: 10 }}
          >
            Importar Excel
          </Button>
        </label>
        <label htmlFor="import-file">
          <Button className='botonTabla'
            variant="contained"
            color="secondary"
            onClick={handleDeleteAllRows}
            style={{ marginBottom: 10, marginLeft: 10, backgroundColor: '#FF0000', color: '#FFFFFF', }}
          >
            Eliminar Lista
          </Button>
        </label>
      </div>

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
