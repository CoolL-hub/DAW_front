import React from 'react';
import { styled } from "@mui/material/styles";
import { createCanvas } from "canvas";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from '../../lib/axios';

const DialogContent = styled( MuiDialogContent )( () => ( {

} ) );
const NameSettings = styled( 'div' )( () => ( {
	display: "flex", flexDirection: "row", gap: 40,
	"& > div": {
		display: "flex", flexDirection: "column", justifyContent: "space-between",
		whiteSpace: "nowrap",
		margin: "8px 0 4px 0",
		"& > label": {
			fontFamily: "Rubik"
		},
		"& > input": {
			cursor: "pointer"
		}
	}
} ) );
const TabPreview = styled( 'div' )( () => ( {
	display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
	fontFamily: "Rubik", fontSize: 20
} ) );
const CancelButton = styled( Button )( () => ( {
	fontFamily: "Rubik", fontWeight: 500, fontSize: 16,
	color: "#212121"
} ) );
const SubmitButton = styled( Button )( () => ( {
	fontFamily: "Rubik", fontWeight: 500, fontSize: 16,
	backgroundColor: "#212121",
	color: "#FFF",
	padding: "4px 15px",
	"&:hover": {
		backgroundColor: "#212121",
		color: "#FFF",
	}
} ) );

class AddDialog extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			tabName: "",
			color: "#93C083"
		}
	}

	prepareTabImage = ( name ) => {
		let initials = "";
		let tabData = name.trim().split( " " );
		for(let i = 0; i < Math.min(tabData.length, 3); i++){
			if( tabData[i][0] !== undefined ) {
				initials += tabData[i][0].toUpperCase();
			}
		}

		const canvas = createCanvas(200, 200);
		const ctx = canvas.getContext("2d");

		ctx.fillStyle = "#FFF";
		ctx.font = canvas.width / 2.5 + "px Rubik";
		ctx.textAlign = "center";
		ctx.fillText( initials, canvas.width / 2, canvas.width / 1.6 );

		return canvas.toDataURL();
	}

	changePreviewColor = ( event ) => {
		this.setState({ color: event.target.value });
	}
	changeTextField = ( event ) => {
		this.setState({ tabName: event.target.value });
	}

	submitComponent = ( event ) => {
		this.setState({ color: "#93C083", tabName: "" });

		let data = {
			name: event.currentTarget.dataset.name,
			bg_color: event.currentTarget.dataset.color,
		}

		axios.post( "/api/projects", data, { headers: { "authorization": 'Bearer ' + localStorage.getItem("token"), } } );
		this.props.closeDialog();
	}

	render(){
		return (
			<div>
				<Dialog open={ this.props.open } onClose={ this.props.closeDialog }>
					<DialogTitle>Enter project data:</DialogTitle>

					<DialogContent>
						<NameSettings>
							<TextField
								sx={{ width: 300 }}
								autoFocus
								id="name"
								label="Project name"
								fullWidth
								value={ this.state.tabName }
								onChange={ this.changeTextField }
								/>
							<div>
								<label>Pick color:</label>
								<input type="color" value={ this.state.color } onChange={ this.changePreviewColor }/>
							</div>
						</NameSettings>
						<div style={{ width: "100%", marginTop: 30 }}>
							<TabPreview>
								<span>Preview</span>
								<img src={ this.prepareTabImage( this.state.tabName ) } width={ 100 } height={ 100 } alt="" style={{ backgroundColor: this.state.color }}/>
							</TabPreview>
						</div>
					</DialogContent>

					<DialogActions>
						<CancelButton onClick={ this.props.closeDialog }>Cancel</CancelButton>
						<SubmitButton data-name={ this.state.tabName } data-color={ this.state.color } onClick={ this.submitComponent }>Submit</SubmitButton>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AddDialog;