import React from "react";
import { styled } from '@mui/material/styles';
import styles from './styles/Home.module.css';
import MuiButton from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import MainDrawer from "./pages/Components/MainDrawer";
import Content from "./pages/Components/Content";

import axios from "./lib/axios";

export default class Main extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			tabs: [],
			categories: [],
			openDrawer: false,
			projectId: 0
		}
	}
	
	componentDidMount(){
		this.getProjects();
	};

	getProjects(){
		axios
			.get( "/api/projects", { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( ( response ) => {
				this.setState({ tabs: response.data, projectId: response.data[0]?.id });
			} );
	}
	
	updatePage = ( ) => {
		axios
			.get( "/api/projects", { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( ( response ) => {
				this.setState({ tabs: response.data });
			} );
	}

	setProjectId = ( id ) => {
		axios
			.get( "/api/projects/"+id, { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( ( response ) => {
				this.setState({ projectId: id, categories: response.data.data.objectives });
			} );
	}
	setOpenDrawer = () => {
		this.setState({ openDrawer: !this.state.openDrawer });
	}

	render(){
		return (
			<div className={ `${ styles.container }` }>
				<MainDrawer projectId = { this.state.projectId } tabs={ this.state.tabs } openDrawer={ this.state.openDrawer } setOpenDrawer={ this.setOpenDrawer } setProjectId={ this.setProjectId } updatePage={ this.updatePage }/>
				{
					this.state.projectId !== 0
					?
					<Content openDrawer={ this.state.openDrawer } categories={ this.state.categories } projectId={ this.state.projectId } setProjectId={ this.setProjectId }/>
					:
					<></>
				}
			</div>
		)
	}
}
