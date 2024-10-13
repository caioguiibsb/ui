import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button, Box, List, ListItem, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormIcon from "@mui/icons-material/Description";
import planilha from "../../assets/files/planilha_padrao.xlsx";
import api from "../../axios";
import { showSnackMessage } from "../../actions/SnackActions";


const Inicial = () => {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const name = useSelector(state => state.AuthReducer.name);

    const [showForm, setShowForm] = useState(false);

    const [dataVenda, setDataVenda] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [valorBruto, setValorBruto] = useState('');
    const [valorLiquido, setValorLiquido] = useState('');
    const [taxa, setTaxa] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');

    const [categoria, setCategoria] = useState();

    useEffect(() => {
        if (showForm) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showForm]);

    const openForm = () => {
        setShowForm(!showForm);
    };

    const isFormValid = () => {
        const isValorBrutoValid = !isNaN(parseFloat(valorBruto.replace(',', '.'))) && valorBruto.trim() !== '';
        const isValorLiquidoValid = !isNaN(parseFloat(valorLiquido.replace(',', '.'))) && valorLiquido.trim() !== '';
        const isTaxaValid = !isNaN(parseFloat(taxa.replace(',', '.'))) && taxa.trim() !== '';
        const isFormaPagamentoValid = formaPagamento.trim() !== '';
        const isNomeProdutoValid = /^[A-Za-zÀ-ÿ\s]+$/.test(nomeProduto.trim());
        const isCategoriaValid = categoria && categoria.trim()

        return isNomeProdutoValid && isCategoriaValid && dataVenda && dataPagamento && isValorBrutoValid && isValorLiquidoValid && isTaxaValid && isFormaPagamentoValid;
    };

    const postFormulario = () => {
        const dataResquest = {
            nome_produto: nomeProduto,
            data_venda: dataVenda,
            data_pagamento: dataPagamento,
            valor_bruto: valorBruto,
            valor_liquido: valorLiquido,
            taxa: taxa,
            forma_pagamento: formaPagamento,
            categoria: categoria
        };
        api.PostPlanilha(dataResquest).then(() => {
            dispatch(showSnackMessage({message: "Dados inseridos com sucesso!", severity: "success"}));
            setDataVenda('');
            setDataPagamento('');
            setValorBruto('');
            setValorLiquido('');
            setTaxa('');
            setFormaPagamento('');
        }).catch(() => {
            setDataVenda('');
            setDataPagamento('');
            setValorBruto('');
            setValorLiquido('');
            setTaxa('');
            setFormaPagamento('');
            dispatch(showSnackMessage({message: "Erro ao enviar os dados! Por favor tente novamente", severity: "error"}));
        });
    }

    const formaPagamentoOptions = [
        { value: "Crédito", label: "Crédito" },
        { value: "Débito", label: "Débito" },
        { value: "Pix", label: "Pix" },
        { value: "Dinheiro", label: "Dinheiro" },
    ];

    const categorias = [
        { value: "Alimentos e Bebidas", label: "Alimentos e Bebidas" },
        { value: "Roupas e Acessórios", label: "Roupas e Acessórios" },
        { value: "Eletrônicos", label: "Eletrônicos" },
        { value: "Móveis e Decoração", label: "Móveis e Decoração" },
        { value: "Beleza e Cuidados Pessoais", label: "Beleza e Cuidados Pessoais" },
        { value: "Saúde e Bem-Estar", label: "Saúde e Bem-Estar" },
        { value: "Brinquedos e Jogos", label: "Brinquedos e Jogos" },
        { value: "Ferramentas e Materiais de Construção", label: "Ferramentas e Materiais de Construção" },
        { value: "Artigos para Animais de Estimação", label: "Artigos para Animais de Estimação" },
        { value: "Serviços", label: "Serviços" },
    ];

    return (
        <div className="main">
            <h1 style={{position: "fixed", top: 40}}>Início</h1>
            <Grid
                container
                justifyContent="center" 
                alignItems="center"
                sx={{ marginTop: 13 }}
            >
                <Grid 
                    item 
                    xs={12} 
                    md={8} 
                    sx={{ 
                        textAlign: "center",
                    }}
                >
                <Typography variant="h4" gutterBottom>
                    Olá, {name} 👋 Seja bem-vindo ao nosso sistema!
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{marginBottom: 6}}>
                    Para que possamos gerar gráficos e explorar todas as funcionalidades, 
                    faça o download da planilha abaixo e preencha com os dados de vendas do mês desejado.
                    Ou, se preferir, preencha o formulário com os dados de venda diária.
                </Typography>
                
                <div style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", borderRadius: 10, padding: "15px"}}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Como devo preencher a planilha?
                    </Typography>

                    <List dense sx={{padding: 0}}>
                        <ListItem>
                            <ListItemText primary="Data Venda ➔ Data da venda do produto." />
                        </ListItem>
                        <ListItem>
                        <   ListItemText primary="Data Pagamento ➔ Data na qual o pagamento foi realizado." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Valor Bruto ➔ Valor bruto da venda." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Valor Líquido ➔ Valor bruto - taxas." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Taxa ➔ Taxa de comissões, taxa de entrega..." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Forma de Pagamento ➔ Método usado para realizar o pagamento." />
                        </ListItem>
                    </List>
                </div>
                <Box sx={{ marginTop: 6, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        startIcon={<DownloadIcon />} 
                        sx={{ marginBottom: 2, width: "250px" }}
                        href={planilha}
                        download="planilha_sisdash.xlsx"
                    >
                        Baixar Planilha
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="small" 
                        startIcon={<FormIcon />} 
                        sx={{ marginBottom: 2, width: "250px" }}
                        onClick={() => openForm()}
                    >
                        Formulário
                    </Button>
                    <Button 
                        variant="contained" 
                        color="info" 
                        size="small" 
                        startIcon={<AttachFileIcon />} 
                        sx={{ width: "250px" }}
                    >
                        Anexar
                    </Button>
                </Box>

                {/* Formulário */}
                {showForm && (
                    <Box ref={formRef} sx={{ marginTop: 11, textAlign: "left" }}>
                        <Typography variant="h5" gutterBottom sx={{marginBottom: 3}}>
                            Preencha os dados de vendas
                        </Typography>
                        <TextField 
                            label="Nome do produto"
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }}
                            size="small"
                            required
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                        />
                        <TextField 
                            label="Data Venda" 
                            type="date" 
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }} 
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            required
                            value={dataVenda}
                            onChange={(e) => setDataVenda(e.target.value)}
                        />
                        <TextField 
                            label="Data Pagamento" 
                            type="date" 
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }} 
                            InputLabelProps={{ shrink: true }} 
                            size="small"
                            required
                            value={dataPagamento}
                            onChange={(e) => setDataPagamento(e.target.value)}
                        />
                        <TextField 
                            label="Valor Bruto" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }}
                            size="small"
                            required
                            value={valorBruto}
                            onChange={(e) => setValorBruto(e.target.value)}
                        />
                        <TextField 
                            label="Valor Líquido" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }}
                            size="small"
                            required
                            value={valorLiquido}
                            onChange={(e) => setValorLiquido(e.target.value)}
                        />
                        <TextField 
                            label="Taxa" 
                            type="number" 
                            fullWidth 
                            variant="outlined" 
                            sx={{ marginBottom: 2 }}
                            size="small"
                            required
                            value={taxa}
                            onChange={(e) => setTaxa(e.target.value)}
                        />
                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }} size="small" required>
                            <InputLabel id="forma-pagamento-label">Forma de Pagamento</InputLabel>
                            <Select
                                labelId="forma-pagamento-label"
                                value={formaPagamento}
                                onChange={(e) => setFormaPagamento(e.target.value)}
                                label="Forma de Pagamento"
                            >
                                {formaPagamentoOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }} size="small" required>
                            <InputLabel id="forma-pagamento-label">Categoria do produto</InputLabel>
                            <Select
                                labelId="forma-pagamento-label"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                label="Categoria do produto"
                            >
                                {categorias.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            disabled={!isFormValid()}
                            onClick={postFormulario}
                        >
                            Enviar
                        </Button>
                    </Box>
                )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Inicial;