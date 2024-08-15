import React, {useCallback}  from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useSelector, useDispatch} from "react-redux";
import {closeSnackMessage} from "../../actions/SnackActions";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SnackBar = (props) => {
	const {open, duration, severity, message} = useSelector(state => state.SnackReducer);
	const dispatch = useDispatch();

	const handleClose = useCallback((event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch(closeSnackMessage());
	}, []);

	return(
		<React.Fragment>
			<Snackbar open={open} autoHideDuration={duration} onClose={handleClose} data-testid="snackbar">
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} data-testid="snackbar-alert">
					{message}
				</Alert>
			</Snackbar>
			{props.children}
		</React.Fragment>

	);
};

export default React.memo(SnackBar);