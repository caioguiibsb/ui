import React, {useEffect, useState} from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Box, Typography } from "@mui/material";
import { PRIMARY, styleCard } from "../../shared/utils";
import api from "../../axios";
import { useDispatch } from "react-redux";
import { showSnackMessage } from "../../actions/SnackActions";
import { Skeleton } from '@mui/material';


const Dashboard = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [faturamentoSeries, setFaturamentoSeries] = useState([
        {
            name: 'Bruto',  
            color: "#FF5E1E",
            label: "Valor Bruto",
            data: [],
        },
        {
            name: 'Líquido',
            color: PRIMARY,
            label: "Valor Líquido",
            data: [],
        },
    ]);
    const [vendasFormaPagamento, setVendasFormaPagamento] = useState([
        { data: [], label: 'Pix' },
        { data: [], label: 'Crédito' },
        { data: [], label: 'Débito' },
        { data: [], label: 'Boleto' }
    ]);
    const [vendasCategoria, setVendasCategoria] = useState([
        {
            data: [],
            cx: 150,
            outerRadius: 80,
            cornerRadius: 5,
        },
    ]);
    const [vendasTotais, setVendasTotais] = useState([
        {
            curve: "linear",
            data: [],
            name: 'Vendas',
            color: "#FF5E1E",
            label: "Vendas",
        },
    ]);
    const [produtosServicosMaisVendidos, setProdutosServicosMaisVendidos] = useState([
        {
            data: [],
            cx: 150,
            outerRadius: 80,
            cornerRadius: 5,
        },
    ]);
    const [faturamentoDates, setFaturamentoDates] = useState([]);

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        setLoading(true);
        api.GetDashboard().then((response) => {
            let data = response.data;
            const brutoValues = data.faturamento[0].bruto;
            const liquidoValues = data.faturamento[1].liquido;
            setFaturamentoSeries(prevSeries => prevSeries.map(series => {
                if (series.name === 'Bruto') {
                    return { ...series, data: brutoValues };
                } else if (series.name === 'Líquido') {
                    return { ...series, data: liquidoValues };
                }
                return series;
            }));
            const pagamentoData = data.vendas_por_forma_pagamento;
            setVendasFormaPagamento((prevVendasFormaPagamento) =>
                prevVendasFormaPagamento.map((forma) => ({
                    ...forma,
                    data: pagamentoData[forma.label] || [],
                }))
            );
            const categoriaData = data.vendas_por_categoria;
            setVendasCategoria((prevVendasCategoria) =>
                prevVendasCategoria.map((categoria) => ({
                    ...categoria,
                    data: categoriaData.map((item) => ({
                        id: item.id,
                        value: item.value,
                        label: item.label,
                    })),
                }))
            );
            const vendasTotais = data.vendas_por_mes;
            setVendasTotais((prevVendasTotais) => [{
                ...prevVendasTotais[0],
                data: vendasTotais,
            }]);
            const produtosServicosMaisVendidos = data.produtos_servicos;
            setProdutosServicosMaisVendidos((prevProdutosServicosMaisVendidos) =>
                prevProdutosServicosMaisVendidos.map((categoria) => ({
                    ...categoria,
                    data: produtosServicosMaisVendidos.map((item) => ({
                        id: item.id,
                        value: item.value,
                        label: item.label,
                    })),
                }))
            );
            setFaturamentoDates(data.dates);
            setLoading(false);
            dispatch(showSnackMessage({message: "Dados carregados com sucesso!", severity: "success"}));
        }).catch(() => {
            setLoading(false);
            dispatch(showSnackMessage({message: "Algo deu errado!", severity: "error"}));
        })
    };

    const data2 = [
        
    ]

    return (
        <div className="main">
			<h1>Dashboard</h1>
            {
                loading ? (
                    <React.Fragment>
                        <Box display="flex" flexDirection="row" justifyContent="center">
                            <Skeleton variant="rectangular" width="70%" height={300} />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2} pt={2} width="100%" justifyContent="center">
                            <Skeleton variant="rectangular" width="34.3%" height={300} />
                            <Skeleton variant="rectangular" width="34.3%" height={300} />
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="center" pt={2}>
                            <Skeleton variant="rectangular" width="70%" height={300} />
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
                                paddingX: "50px"
                            }}
                        >
                            <Box sx={{...styleCard}}>
                                <Typography color="black">
                                    Faturamento Bruto x Líquido (R$)
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: faturamentoDates }]}
                                    series={faturamentoSeries}
                                    maxWidth={1020}
                                    height={300}
                                    grid={{ vertical: true, horizontal: true }}
                                    sx={{
                                        marginLeft: faturamentoSeries.some((data) => data.data.some((value) => value > 1000)) ? 4 : 0,
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, width: 500}}>
                                <Typography color="black">
                                    Vendas por forma de pagamento (%)
                                </Typography>
                                <BarChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C"]}
                                    xAxis={[{ scaleType: 'band', data: faturamentoDates }]}
                                    series={vendasFormaPagamento}
                                    width={500}
                                    height={300}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    grid={{ vertical: true, horizontal: true }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, width: 500}}>
                                <Typography color="black">
                                    Vendas por categoria (%)
                                </Typography>
                                <PieChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C", "#5C6BC0", "#FF6F61", "#4CAF50", "#9C27B0"]}
                                    series={vendasCategoria}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                            <Box sx={{...styleCard}}>
                                <Typography color="black">
                                    Quantidade de vendas
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: faturamentoDates }]}
                                    series={vendasTotais}
                                    maxWidth={1020}
                                    height={300}
                                    grid={{ vertical: true, horizontal: true }}
                                    sx={{
                                        marginLeft: vendasTotais.some((data) => data.data.some((value) => value > 1000)) ? 4 : 0,
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, width: 500}}>
                                <Typography color="black">
                                    Produtos/Serviços mais vendidos (%)
                                </Typography>
                                <PieChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C", "#5C6BC0", "#FF6F61", "#4CAF50", "#9C27B0"]}
                                    series={produtosServicosMaisVendidos}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                            <Box sx={{...styleCard, width: 500}}>
                                <Typography color="black">
                                    Margem de lucro por período (%)
                                </Typography>
                                <BarChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C"]}
                                    xAxis={[{ scaleType: 'band', data: ['jul/2024', 'ago/2024', 'set/2024'] }]}
                                    series={[
                                        { data: [12, 10, 30], label: 'Lucro' },
                                    ]}
                                    width={500}
                                    height={300}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    grid={{ vertical: true, horizontal: true }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
};

export default Dashboard;