import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showSnackMessage } from "../../actions/SnackActions";
import { Skeleton, Button, Box, Autocomplete, TextField } from '@mui/material';
import { PRIMARY, styleCard } from "../../shared/utils";
import { DataGrid } from '@mui/x-data-grid';



const Planilha = () => {

    const dispatch = useDispatch();
    const screenHeight = window.innerHeight;
    const nav = useNavigate();
    const name = useSelector(state => state.AuthReducer.name);

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const columns = [
        { 
            field: 'data_venda',
            headerName: 'Data venda',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'data_pagamento',
            headerName: 'Data pagamento',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'valor_bruto',
            headerName: 'Valor bruto',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'valoir_liquido',
            headerName: 'Valor líquido',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'taxa',
            headerName: 'Taxa',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'forma_pagamento',
            headerName: 'Forma pagamento',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'nome_produto',
            headerName: 'Produto',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: 'categoria_produto',
            headerName: 'Categoria',
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
      ];
      
      const rows = [
        { id: 1, data_venda: '01/02/2023', data_pagamento: '05/02/2023', valor_bruto: 'R$ 1000', valoir_liquido: 'R$ 900', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto A', categoria_produto: 'Categoria X' },
        { id: 2, data_venda: '01/03/2023', data_pagamento: '05/03/2023', valor_bruto: 'R$ 2000', valoir_liquido: 'R$ 1800', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto B', categoria_produto: 'Categoria Y' },
        { id: 3, data_venda: '01/04/2023', data_pagamento: '05/04/2023', valor_bruto: 'R$ 1500', valoir_liquido: 'R$ 1350', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto C', categoria_produto: 'Categoria Z' },
        { id: 4, data_venda: '01/05/2023', data_pagamento: '05/05/2023', valor_bruto: 'R$ 2500', valoir_liquido: 'R$ 2250', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto D', categoria_produto: 'Categoria X' },
        { id: 5, data_venda: '01/06/2023', data_pagamento: '05/06/2023', valor_bruto: 'R$ 1800', valoir_liquido: 'R$ 1620', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto E', categoria_produto: 'Categoria Y' },
        { id: 6, data_venda: '01/07/2023', data_pagamento: '05/07/2023', valor_bruto: 'R$ 1300', valoir_liquido: 'R$ 1170', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto F', categoria_produto: 'Categoria Z' },
        { id: 7, data_venda: '01/08/2023', data_pagamento: '05/08/2023', valor_bruto: 'R$ 2200', valoir_liquido: 'R$ 1980', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto G', categoria_produto: 'Categoria X' },
        { id: 8, data_venda: '01/09/2023', data_pagamento: '05/09/2023', valor_bruto: 'R$ 1600', valoir_liquido: 'R$ 1440', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto H', categoria_produto: 'Categoria Y' },
        { id: 9, data_venda: '01/10/2023', data_pagamento: '05/10/2023', valor_bruto: 'R$ 1700', valoir_liquido: 'R$ 1530', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto I', categoria_produto: 'Categoria Z' },
        { id: 10, data_venda: '01/11/2023', data_pagamento: '05/11/2023', valor_bruto: 'R$ 2100', valoir_liquido: 'R$ 1890', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto J', categoria_produto: 'Categoria X' },
        { id: 11, data_venda: '01/12/2023', data_pagamento: '05/12/2023', valor_bruto: 'R$ 2000', valoir_liquido: 'R$ 1800', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto K', categoria_produto: 'Categoria Y' },
        { id: 12, data_venda: '01/01/2024', data_pagamento: '05/01/2024', valor_bruto: 'R$ 1500', valoir_liquido: 'R$ 1350', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto L', categoria_produto: 'Categoria Z' },
    { id: 13, data_venda: '01/02/2024', data_pagamento: '05/02/2024', valor_bruto: 'R$ 2200', valoir_liquido: 'R$ 1980', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto M', categoria_produto: 'Categoria X' },
    { id: 14, data_venda: '01/03/2024', data_pagamento: '05/03/2024', valor_bruto: 'R$ 1700', valoir_liquido: 'R$ 1530', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto N', categoria_produto: 'Categoria Y' },
    { id: 15, data_venda: '01/04/2024', data_pagamento: '05/04/2024', valor_bruto: 'R$ 2500', valoir_liquido: 'R$ 2250', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto O', categoria_produto: 'Categoria Z' },
    { id: 16, data_venda: '01/05/2024', data_pagamento: '05/05/2024', valor_bruto: 'R$ 3000', valoir_liquido: 'R$ 2700', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto P', categoria_produto: 'Categoria X' },
    { id: 17, data_venda: '01/06/2024', data_pagamento: '05/06/2024', valor_bruto: 'R$ 2000', valoir_liquido: 'R$ 1800', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto Q', categoria_produto: 'Categoria Y' },
    { id: 18, data_venda: '01/07/2024', data_pagamento: '05/07/2024', valor_bruto: 'R$ 1800', valoir_liquido: 'R$ 1620', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto R', categoria_produto: 'Categoria Z' },
    { id: 19, data_venda: '01/08/2024', data_pagamento: '05/08/2024', valor_bruto: 'R$ 2200', valoir_liquido: 'R$ 1980', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto S', categoria_produto: 'Categoria X' },
    { id: 20, data_venda: '01/09/2024', data_pagamento: '05/09/2024', valor_bruto: 'R$ 2500', valoir_liquido: 'R$ 2250', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto T', categoria_produto: 'Categoria Y' },
    { id: 21, data_venda: '01/10/2024', data_pagamento: '05/10/2024', valor_bruto: 'R$ 3000', valoir_liquido: 'R$ 2700', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto U', categoria_produto: 'Categoria Z' },
    { id: 22, data_venda: '01/11/2024', data_pagamento: '05/11/2024', valor_bruto: 'R$ 3500', valoir_liquido: 'R$ 3150', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto V', categoria_produto: 'Categoria X' },
    { id: 23, data_venda: '01/12/2024', data_pagamento: '05/12/2024', valor_bruto: 'R$ 4000', valoir_liquido: 'R$ 3600', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto W', categoria_produto: 'Categoria Y' },
    { id: 24, data_venda: '01/01/2025', data_pagamento: '05/01/2025', valor_bruto: 'R$ 4500', valoir_liquido: 'R$ 4050', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto X', categoria_produto: 'Categoria Z' },
    { id: 25, data_venda: '01/02/2025', data_pagamento: '05/02/2025', valor_bruto: 'R$ 5000', valoir_liquido: 'R$ 4500', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto Y', categoria_produto: 'Categoria X' },
    { id: 26, data_venda: '01/03/2025', data_pagamento: '05/03/2025', valor_bruto: 'R$ 5500', valoir_liquido: 'R$ 4950', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto Z', categoria_produto: 'Categoria Y' },
    { id: 27, data_venda: '01/04/2025', data_pagamento: '05/04/2025', valor_bruto: 'R$ 6000', valoir_liquido: 'R$ 5400', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto AA', categoria_produto: 'Categoria Z' },
    { id: 28, data_venda: '01/05/2025', data_pagamento: '05/05/2025', valor_bruto: 'R$ 6500', valoir_liquido: 'R$ 5850', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto AB', categoria_produto: 'Categoria X' },
    { id: 29, data_venda: '01/06/2025', data_pagamento: '05/06/2025', valor_bruto: 'R$ 7000', valoir_liquido: 'R$ 6300', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto AC', categoria_produto: 'Categoria Y' },
    { id: 30, data_venda: '01/07/2025', data_pagamento: '05/07/2025', valor_bruto: 'R$ 7500', valoir_liquido: 'R$ 6750', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto AD', categoria_produto: 'Categoria Z' },
    { id: 31, data_venda: '01/08/2025', data_pagamento: '05/08/2025', valor_bruto: 'R$ 8000', valoir_liquido: 'R$ 7200', taxa: 'R$ 10', forma_pagamento: 'Débito', nome_produto: 'Produto AE', categoria_produto: 'Categoria X' },
    { id: 32, data_venda: '01/09/2025', data_pagamento: '05/09/2025', valor_bruto: 'R$ 8500', valoir_liquido: 'R$ 7650', taxa: 'R$ 10', forma_pagamento: 'Pix', nome_produto: 'Produto AF', categoria_produto: 'Categoria Y' },
    { id: 33, data_venda: '01/10/2025', data_pagamento: '05/10/2025', valor_bruto: 'R$ 9000', valoir_liquido: 'R$ 8100', taxa: 'R$ 10', forma_pagamento: 'Boleto', nome_produto: 'Produto AG', categoria_produto: 'Categoria Z' },
    { id: 34, data_venda: '01/11/2025', data_pagamento: '05/11/2025', valor_bruto: 'R$ 9500', valoir_liquido: 'R$ 8550', taxa: 'R$ 10', forma_pagamento: 'Crédito', nome_produto: 'Produto AH', categoria_produto: 'Categoria X' },
    ];
    

    return (
        <div className="main">
            <h1>Planilha</h1>
            <Grid
                container
                justifyContent="center" 
                alignItems="center"
                sx={{ marginTop: 5 }}
            >
                <Grid 
                    item 
                    xs={12}
                    sx={{ 
                        textAlign: "center",
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        paddingX: "12%",
                        paddingY: "50px",
                    }}
                >
                    <Box sx={{ width: "40%", marginBottom: 4, display: "flex", gap: 2, alignItems: "center", justifyContent: "center", flex: 1}}>
                        <Autocomplete
                            multiple
                            id="size-small-filled"
                            size="small"
                            options={[1, 2]}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {setSelectedOptions(newValue)}}
                            defaultValue={selectedOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Período" variant="filled" placeholder="Selecione" />
                            )}
                            sx={{ width: '500px' }}
                        />
                        <Button 
                            variant="contained" 
                            sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                            size="small" 
                            // onClick={getDashboard}
                        >
                            Filtrar
                        </Button>
                    </Box>
                    <Box sx={{boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)", borderRadius: 2, height: "57vh", width: "100%"}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            sx={{borderRadius: 2, border: "1px solid #D3D3D3"}}
                            pageSizeOptions={[10, 50, 100]}
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Planilha;