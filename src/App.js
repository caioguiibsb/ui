import React from "react";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import {getRoutes} from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import SnackBar from "./components/SnackBar/SnackBar";


export default function App(){
	const dispatch = useDispatch();
	const token = Cookies.get("tk");

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
				<SnackBar>
					<RouterProvider router={getRoutes(dispatch)}/>
				</SnackBar>
		</LocalizationProvider>
	);
}
