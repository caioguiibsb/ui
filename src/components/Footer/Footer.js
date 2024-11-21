import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Facebook, Twitter, GitHub } from "@mui/icons-material";


const Footer = () => {

    const openRepository = () => {
        window.open("https://github.com/SyncDash-TCC", "_blank");
    }

    return(
        <Box 
            sx={{
                backgroundColor: "white", flexGrow: 1,
                overflowX: "auto",
                overflowY: "unset",
                margin: "0 30px",
                borderRadius: "15px",
                padding: 1,
                display:  "flex",
                gap: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                }}
            >
                © 2024 SyncDash. Todos os direitos reservados
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                }}
            >
                |
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                }}
            >
                Desenvolvido com 🧡 por Felipe e Humberto
            </Typography>
            <Box sx={{ display: "flex", gap: 2, cursor: "pointer"}}>
                <GitHub onClick={openRepository} />
            </Box>
        </Box>
    )

};

export default Footer;
