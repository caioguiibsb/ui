import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { showSnackMessage } from "../../actions/SnackActions";
import { Skeleton, Button, Box, Autocomplete, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import api from "../../axios";
import { PRIMARY, localeText } from "../../shared/utils";
import { useLocation, useNavigate } from "react-router-dom";


const Planilha = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    let id_historico = location?.state?.id || null;
    const data = location?.state?.data || null;
    const hora = location?.state?.hora || null;
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getPlanilhaDetail()
    }, []);

    const getPlanilhaDetail = async (clear=false) => {
        setLoading(true);
        let dates_formatted = selectedOptions.map((date) => date.value);
        const dataRequest = {
            date_selected: clear ? null : dates_formatted
        };
        if (!clear && id_historico) {
            dataRequest.id_historico = id_historico;
        }
        api.GetPlanilhaDetail(dataRequest).then(response => {
            let data = response.data;
            setRows(data.planilhas);
            let dates = data.dates.map((date) => ({label: date, value: date}));
            let dates_selected = data.date_selected.map((date) => ({label: date, value: date}));
            setOptions(dates);
            setSelectedOptions(dates_selected);
            dispatch(showSnackMessage({message: "Dados carregados com sucesso!", severity: "success"}));
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            dispatch(showSnackMessage({message: "Algo deu errado!", severity: "error"}));
        })
    };

    const columns = [
        { 
            field: "data_venda",
            headerName: "Data venda",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "data_pagamento",
            headerName: "Data pagamento",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "valor_bruto",
            headerName: "Valor bruto",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "valor_liquido",
            headerName: "Valor líquido",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "taxa",
            headerName: "Taxa",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "forma_pagamento",
            headerName: "Forma pagamento",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "nome_produto",
            headerName: "Produto",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "categoria_produto",
            headerName: "Categoria",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
    ];

    const handleBack = () => {
        navigate("/planilha", { replace: true });
        getPlanilhaDetail(true);
    };


    return (
        <div className="main">
            <h1>
                Planilha
                {
                    id_historico && (
                        <Typography sx={{fontWeight: "normal", color: PRIMARY}}>
                            Dados do histórico ({data} - {hora})
                        </Typography>
                    )
                }
            </h1>
            {
                loading ? (
                    <React.Fragment>
                        <Box display="flex" flexDirection="row" justifyContent="center" sx={{marginTop: 10}}>
                            <Skeleton variant="rectangular" width="76%" height={600} />
                        </Box>
                    </React.Fragment>
                ) : (
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
                                paddingY: "10px",
                            }}
                        >
                            <Box sx={{ width: "40%", marginBottom: 4, display: "flex", gap: 2, alignItems: "center", justifyContent: "center", flex: 1, flexWrap: "wrap"}}>
                                <Autocomplete
                                    multiple
                                    id="size-small-filled"
                                    size="small"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => {setSelectedOptions(newValue)}}
                                    defaultValue={selectedOptions}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Período" variant="filled" placeholder="Selecione" />
                                    )}
                                    sx={{ width: "500px" }}
                                />
                                <Button 
                                    variant="contained" 
                                    sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                    size="small" 
                                    onClick={() => getPlanilhaDetail()}
                                >
                                    Filtrar
                                </Button>
                                {
                                    id_historico && (
                                        <Button 
                                            variant="contained" 
                                            sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                            size="small" 
                                            onClick={() => handleBack()}
                                        >
                                            Exibir todos os dados
                                        </Button>
                                    )
                                }
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
                                    sx={{
                                        borderRadius: 2, border: "1px solid #D3D3D3",
                                        "& .MuiDataGrid-columnHeaderTitle": {
                                            fontWeight: "bold",
                                            color: PRIMARY,
                                        },
                                        "& .MuiDataGrid-columnHeader": {
                                            backgroundColor: "#F5F5F5",
                                        }
                                    }}
                                    pageSizeOptions={[10, 50, 100]}
                                    localeText={localeText}
                                    slots={{
                                        toolbar: GridToolbar,
                                    }}
                                    slotProps={{
                                        pagination: {
                                          labelRowsPerPage: "Linhas por página",
                                        },
                                     }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
}

export default Planilha;