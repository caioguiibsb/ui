import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Planilha = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();
    const name = useSelector(state => state.AuthReducer.name);

    return (
        <div className="main">
            <h1 style={{position: "fixed", top: 40}}>Planilha</h1>
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

                </Grid>
            </Grid>
        </div>
    );
}

export default Planilha;