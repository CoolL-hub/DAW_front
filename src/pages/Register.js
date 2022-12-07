import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";

import axios from "../lib/axios";

const TextField = styled( MuiTextField )( () => ( {
	marginTop: 25, width: 289,
	fontFamily: "Rubik", fontWeight: 400, fontStyle: "italic", fontSize: 20,
	"& .Mui-focused": {
		"& label": {
			color: "#FFF"
		}
	},
	"& .MuiInputBase-root": {
		color: "#FFF",
		borderBottom: "2px solid #FFF",
		"&:before": {
			content: "none",
		},
		"&:after": {
			content: "none"
		},
	},
	"& input:focus": {
		color: "#FFF"
	},
	"& input": {
		fontStyle: "initial",
		fontSize: 18,
		"&::selection": {
			backgroundColor: "#2E3236"
		},
		"&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 1000px #0078FF inset",
			WebkitTextFillColor: "#FFF"
		}
	},
	"& label": {
		color: "#FFF",
		"&.Mui-focused": {
			color: "#FFF"
		}
	}
} ) );
const Root = styled( 'div' )( () => ( {
	height: "100vh", width: "100%",
	backgroundColor: "#0078FF",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	"& .Mui-focused": { color: "#2c3956" },
	"& .MuiOutlinedInput-input": {
		paddingLeft: 15,
		borderRadius: 6,
		height: 51,
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: "white"
	},
	"& .MuiOutlinedInput-root" : {
		height: 51,
		// "& fieldset" : { borderRadius: 6, borderColor: '#21abee' },
		"&:hover fieldset": { border: "2px solid #21abee" },
		"&.Mui-focused fieldset": { border: "2px solid #21abee" }
	},
} ) );
const Dialog = styled( 'div' )( () => ( {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: 400,
	height: 300,
	borderRadius: 15
} ) );
const Button = styled( MuiButton )( () => ( {
	fontFamily: "Rubik", fontWeight: 400, fontSize: 20,
	marginTop: 54, width: 300, backgroundColor: "#2E3236", color: "white",
	borderRadius: 16, padding: "16px 0",
	border: "2px solid #0078FF",
	"&:hover": { backgroundColor: "#0078FF", border: "2px solid #FFF" },
	"& .MuiButton-label": { textTransform: "uppercase", color: "white", fontSize: 16 }
} ) );
const LoginButton = styled( "span" )( () => ( {
	fontFamily: "Rubik", fontSize: 18, fontWeight: 700, letterSpacing: 1.5,
	cursor: "pointer",
	marginTop: 40,
	textAlign: "center",
	"&:hover": {
		textDecoration: "underline",
	}
} ) );
const FlashMessage = styled( 'div' )( () => ( {
	position: "absolute",
	display: "flex",
	flexDirection: "row-reverse",
	alignItems: "center",
	width: "100%",
	top: 0,
	height: 51,
	backgroundColor: "#fd000b"
} ) );
const FlashMessageText = styled( 'div' )( () => ( {
	marginRight: 20, color: "white", fontSize: 15, marginLeft: 20
} ) );

////////////////////////////////////////////////////////////////////////////////////
export default function Register( props: any ){
	const registerInput = React.useRef("");
	const passwordInput = React.useRef("");
	const passwordInputConfirm = React.useRef("");
	//const router = useRouter();
	
	function register(){
		console.log( typeof(passwordInput.current) );
		if( typeof registerInput.current === "object" ||
			typeof passwordInput.current === "object" ||
			typeof passwordInputConfirm.current === "object"
		) {
			alert( "Fields can't be empty!" );
			return;
		}
		if( passwordInput.current !== passwordInputConfirm.current ) {
			alert( "Passwords do not match!" );
			return;
		}

		const data = {
			"email": registerInput.current,
			"password": passwordInput.current
		};
			
		axios
			.post( "/api/signup", data )
			.then( response => {
				localStorage.setItem( "token", response.data.token );
				//router.push( "/" );
			} )
			.catch( error => {
				console.error( error );
			} );
	}

	function changeUserName( event: any ){
		registerInput.current = event.target.value;
	}
	function changePassword( event: any ){
		passwordInput.current = event.target.value;
	}
	function changePasswordConfirm( event: any ){
		passwordInputConfirm.current = event.target.value;
	}

	function catchEnterRegister( event: any ){
		if( event.key === "Enter" ) {
			register();
		}
	}

	return (
		<Root>
			{
				props.loginError 
				? 
					<FlashMessage>
						<FlashMessageText>{ props.loginError }</FlashMessageText>
					</FlashMessage>
				: null
			}
			<Dialog>
				<TextField
					// sx={{ color: "red" }}
					inputRef={ registerInput }
					autoComplete="username"
					label="Name" 
					variant="standard"
					onChange = { changeUserName }
					onKeyPress={ catchEnterRegister }
				/>
				<TextField
					inputRef={ passwordInput }
					label="Password"
					type="password"
					autoComplete="current-password"
					variant="standard"
					onChange = { changePassword }
					onKeyPress={ catchEnterRegister }
				/>
				<TextField
					inputRef={ passwordInputConfirm }
					label="Password confirm"
					type="password"
					autoComplete="current-password"
					variant="standard"
					onChange = { changePasswordConfirm }
					onKeyPress={ catchEnterRegister }
				/>
				<div style={ { marginTop: 20, display: "flex", flexDirection: "column" } }>
					<Button onClick= { register }>Sign up</Button>
					<LoginButton onClick= { () => {} }>Sign in</LoginButton>
				</div>
			</Dialog>
		</Root>
	);
}