import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import styles from './styles/Home.module.css';
import MuiButton from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import MainDrawer from "./pages/Components/MainDrawer";
import Content from "./pages/Components/Content";
import Main from "./Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import axios from "./lib/axios";

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {

		}
	}

	render(){
		return (
			<BrowserRouter>
				<Routes>
					<Route path="*" element={ <Main/> }/>
					<Route path="login" element={ <Login/> }/>
					<Route path="register" element={ <Register/> }/>
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App;
