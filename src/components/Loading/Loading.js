import React  from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {BLACK_LABEL_UX} from "../../shared/utils";

const Loading = () => {

	return(
		<div style={styles.center} data-testid="loading">
			<CircularProgress sx={{color: BLACK_LABEL_UX}}/>
		</div>
	);
};

// Create styles
const styles = {
	center: {
		textAlign: "center"
	}
};

export default Loading;