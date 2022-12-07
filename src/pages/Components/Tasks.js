import React, { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDivider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

import SettingsIcon from '@mui/icons-material/Settings';

import AddCategoryDialog from "./AddCategoryDialog";

import axios from "../../lib/axios";


const drawerWidth = 300;
const closedDrawerWidth = 100;

const Root = styled( 'div' )( () => ( {
	transition: "margin 1s ease"
} ) );
const AppBar = styled( 'div' )( () => ( {
	height: 95
} ) );
const Divider = styled( MuiDivider )( () => ( {
	width: "95%",
	margin: "0px auto 40px auto",
	borderColor: "#929292"
} ) );
const WorkingContainer = styled( 'div' )( () => ( {
	display: "flex", flexDirection: "row", gap: 50,
	transition: "margin 1s ease", margin: "0 2.5%",
	flexWrap: "wrap", height: "800px", overflowY: "auto",
	justifyContent: "center", alignContent: "flex-start"
} ) );
const DeleteObjective = styled( 'div' )( () => ( {
	fontFamily: "Rubik", fontWeight: 600,
	color: "#b91d3a", cursor: "pointer",
	userSelect: "none"
} ) );
const AddCategory = styled( 'div' )( () => ( {
	display: "flex", justifyContent: "center",
	width: 300,
	height: 42,
	backgroundColor: "#BBB",
	cursor: "pointer",
	padding: "8px 0px",
	borderRadius: 4,
	transition: "background-color 0.2s ease",
	border: "1px solid #000",
	"&:hover": {
		backgroundColor: "#DDD",
	}
} ) );
const AddIcon = styled( 'span' )( () => ( {
	fontFamily: "Rubik", fontWeight: 500,
	fontSize: 20,
	color: "#212121"
} ) );
const TaskContainer = styled( 'div' )( () => ( {
	width: 300,	height: "fit-content",
	backgroundColor: "#BBB",
	color: "#000",
	padding: 20
} ) );
const TaskTitle = styled( 'span' )( () => ( {
	fontFamily: "Rubik", fontWeight: 500,
} ) );

class Tasks extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			openCategoryDialog: false,
			categories: this.props.categories,
			tasks: []
		}
	}

	componentDidMount = () => {
		axios
			.get( "/api/objectives/" + this.props.objectiveId, { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( ( response ) => {
				this.setState({ tasks: response.data.data.key_results });
			} );
	}
	addNewObjective = ( ) => {
		axios
			.get( "/api/projects/" + this.props.projectId, { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( response => {
				this.props.setProjectId( this.props.projectId );
			});
	}
	deleteObjective = ( id ) => {
		axios
			.delete( "/api/objectives/" + id, { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } )
			.then( ( response ) => {
				this.props.setProjectId( this.props.projectId );
			} );
	}
	toggleDialog = () => {
		this.setState({ openCategoryDialog: !this.state.openCategoryDialog });
	}

	render(){
		console.log("asdasd")
		return (
			<Root style={{ marginLeft: this.props.openDrawer ? drawerWidth : closedDrawerWidth }}>
				<Divider/>
				<WorkingContainer>
				{
					this.state.tasks.map( category => {
						return(
							<TaskContainer>
								{/* <div style={{ display: "flex", justifyContent: "space-between" }}>
									<TaskTitle key={ category.id }>{ category.name }</TaskTitle>
									<DeleteObjective onClick={ ( ) => this.deleteObjective( category.id ) }>Delete</DeleteObjective>
								</div>
								<br/>
								<span>Progress:</span>
								<div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
									<div style={{ width: "100%" }}>
										<LinearProgress variant="determinate" value={ 50 }/>
									</div>
									<div style={{ minWidth: 20 }}>
										<span>50%</span>
									</div>
								</div>
								<br/>
								<br/>
								<span>Tasks:</span>
								<br/>
								<br/>
								{
									category.key_results > 0
									?
									category.key_results.map( keyResult => {
										return(
											<div key={ keyResult.id }>
												<span style={{ fontFamily: "Rubik", fontSize: 18, fontWeight: 600, color: keyResult.done ? "#2AA000" : "#212121" }}>{ keyResult.name }</span>
												<br/>
												<br/>
											</div>
										)
									} )
									:
									<></>
								}
								<span>{  }</span> */}
							</TaskContainer>
						)
					} )
				}


				<AddCategory onClick={ this.toggleDialog }>
					<AddIcon>Add objective</AddIcon>
				</AddCategory>
				</WorkingContainer>
	
				<AddCategoryDialog open={ this.state.openCategoryDialog } closeDialog={ this.toggleDialog } projectId={ this.props.projectId } addNewObjective={ this.addNewObjective }/>
			</Root>
		)
	}
}

export default Tasks;