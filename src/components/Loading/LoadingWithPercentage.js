import React, {useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    WHITE_ESCRITA_THEME,
    GRAY_LABEL_UX
} from "../../shared/utils";
import { useSelector } from "react-redux";

const LoadingWithPercentage = (props) => {

    const {percentage, size = 100, thickness = 4, setProgressComplete} = props;

    const temaEscuro = useSelector(state => state.AuthReducer.temaEscuro);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    setProgressComplete(true);
                    return 100;
                }
                return prevProgress + percentage;
            });
        }, 800);
        return () => clearInterval(timer);
    }, [percentage, setProgressComplete]);

    return (
        <Box sx={{ position: "relative", display: "inline-flex", width: size, height: size }}>
            <CircularProgress variant="determinate" value={progress} size={size} thickness={thickness} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: temaEscuro ? WHITE_ESCRITA_THEME : GRAY_LABEL_UX, fontWeight: 600, fontSize: "20px" }}
                >
                {`${Math.round(progress)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default React.memo(LoadingWithPercentage);