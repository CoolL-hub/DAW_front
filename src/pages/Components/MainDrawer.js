import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { createCanvas, loadImage } from "canvas";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiButton from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import MuiDivider from "@mui/material/Divider";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "../../assets/images/Add.svg";
import LogoutIcon from "../../assets/images/Logout.svg";
import ActiveIcon from "../../assets/images/Active.svg";

import AddProject from "./AddProject";

import axios from "../../lib/axios";

const drawerWidth = 300;
const closedDrawerWidth = 100;
const PageTransition = "width 1s ease, margin 1s ease";

const Drawer = styled( MuiDrawer )( () => ( {
	width: drawerWidth,
	transition: PageTransition,
	flexShrink: 0,
	"&.closedDrawer": {
		width: closedDrawerWidth,
		"& .MuiPaper-root": {
			width: closedDrawerWidth
		}
	},
	"& .MuiPaper-root": {
		overflowX: "hidden",
		width: drawerWidth,
		backgroundColor: "#2C2C2C",
		border: 0,
		transition: PageTransition
	}
} ) );
const TabsScroll = styled( 'div' )( () => ( {
	overflowY: "auto",
	marginBottom: 23,
	"&::-webkit-scrollbar": {
		width: 5
	},
	"&::-webkit-scrollbar-track": {
		background: "#f1f1f1",
		borderRadius: 20
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#888",
		borderRadius: 20
	},
	"&::-webkit-scrollbar-thumb:hover": {
		background: "#555"
	}
} ) );
const Divider = styled( MuiDivider )( () => ( {
	width: "calc(100% - 46px)",
	margin: "0 auto",
	borderColor: "#929292"
} ) );
const ListItem = styled( 'div' )( () => ( {
	width: "100%",
	fontSize: 14,
	padding: "10px 0",
	margin: "13px 0 13px 0px",
	backgroundColor: "#2C2C2C",
	cursor: "pointer",
	"&.activeTab":{
		backgroundColor: "#565656"
	},
	"&.closedDrawer":{
		"&.Mui-selected":{
			backgroundColor: "#f5f7f8",
			"& > div": {
				filter: "invert(28%) sepia(54%) saturate(3979%) hue-rotate(203deg) brightness(105%) contrast(102%)"
			},
		},
		transition: "none"
	}
} ) );
const ListItemFlex = styled( 'div' )( () => ( {
	display: "flex", alignItems: "center",
	fontSize: 18, fontWeight: 400,
	color: "#FFF",
	"& span": {
		marginLeft: 20,
		maxHeight: 54
	}
} ) );
const ActiveIndicator = styled( 'img' )( () => ( {
	margin: "0 9px"
} ) );
const LogoContainer = styled( 'div' )( () => ( {
	margin: "23px auto",
} ) );
const TabContainer = styled( 'img' )( () => ( {
	width: 54, height: 54,
	marginLeft: 23,
	cursor: "pointer",
	"&.activeTab": {
		marginLeft: 0,
	}
} ) );
const LogoutContainer = styled( 'div' )( () => ( {
	margin: "auto auto 23px auto",
	width: "100%",
	cursor: "pointer"
} ) );
const CloseDrawer = styled( IconButton )( () => ( {
	margin: "auto 0 auto auto",
	padding: 20,
	backgroundColor: "#2C2C2C",
	position: "fixed",
	top: 20, left: drawerWidth - 33,
	visibility: "visible",
	transition: "left 1s ease",
	"&:hover": {
		backgroundColor: "#2C2C2C"
	},
	"& > img": {
		padding: 5
	},
	"&.closedDrawer": {
		visibility: "hidden",
		left: closedDrawerWidth - 33
	}
} ) );

class MainDrawer extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			openDialog: false,
			activeId: 0
		}
	}

	componentDidMount () {
		this.setState({ activeId: this.props.projectId });
	};
		
	prepareTabImage = ( name ) => {
		let initials = "";
		let tabData = name.trim().split( " " );
		for( let i = 0; i < Math.min(tabData.length, 3); i++ ){
			if( tabData[i][0] !== undefined ) {
				initials += tabData[i][0].toUpperCase();
			}
		}

		const canvas = createCanvas(200, 200);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = "#FFF";
		ctx.font = canvas.width / 2.5 + "px Rubik";
		ctx.textAlign = "center";
		ctx.fillText( initials, canvas.width / 2, canvas.width / 1.6 );

		return canvas.toDataURL();
	}

	changeActiveId = ( event ) => {
		this.setState({ activeId: parseInt( event.currentTarget.dataset.id ) });
		this.props.setProjectId( parseInt( event.currentTarget.dataset.id ) );
	}
	toggleDrawer = () => {
		this.props.setOpenDrawer( !this.props.openDrawer );
	}
	toggleDialog = () => {
		this.setState({ openDialog: !this.state.openDialog });
		this.props.updatePage();
	}
	logout = () => {
		window.location = "/login";
	}

	render(){
		return(
			<Drawer 
				className={ `${!this.props.openDrawer ? "closedDrawer": ""}` }
				variant="permanent"
				anchor="left"
				open = { true }
			>
				<LogoContainer>
					<IconButton onClick={ this.toggleDrawer }>
						<MenuIcon fontSize={ "large" } sx={{ color: "#FFF" }}/>
					</IconButton>
				</LogoContainer>
				{/* <CloseDrawer onClick={ toggleDrawer } className={ `${!openDrawer ? "closedDrawer": ""}` }>
					<ArrowBackIcon/>
				</CloseDrawer> */}
				<Divider/>

				<ListItem className={ `${!this.props.openDrawer ? "closedDrawer": ""}` } onClick={ this.toggleDialog }>
					<ListItemFlex>
						<TabContainer src={ AddIcon } width={ 40 } height={ 40 } alt=""/>
						{
							this.props.openDrawer
							?
							<span>{ "Add" }</span>
							:
							<></>
						}
					</ListItemFlex>
				</ListItem>

				<TabsScroll>
				{
					this.props.tabs.map( ( tab ) => {
						return(
							<Tooltip key={ tab.id } title={ tab.name } arrow disableHoverListener={ this.props.openDrawer } placement="right" sx={{ fontSize: 18 }}>
								<ListItem
									className={ `${!this.props.openDrawer ? "closedDrawer": ""} ${this.state.activeId === tab.id ? "activeTab": ""}` }
									data-id={ tab.id }
									onClick={ this.changeActiveId }
								>
									<ListItemFlex>
										{
											this.state.activeId === tab.id
											?
											<ActiveIndicator src={ ActiveIcon } width={ 5 } alt=""/>
											:
											<></>
										}
										<TabContainer onClick={ this.changeActiveId } data-id={ tab.id } className={ `${this.state.activeId === tab.id ? "activeTab": ""}` } style={{ backgroundColor: tab.bg_color }} src={ this.prepareTabImage( tab.name ) } alt={ tab.name }/>
										{
											this.props.openDrawer
											?
											<span>{ tab.name }</span>
											:
											<></>
										}
									</ListItemFlex>
								</ListItem>
							</Tooltip>
						)
					} )
				}
				</TabsScroll>

				<LogoutContainer onClick={ this.logout }>
					<Divider/>
					<img style={{ marginTop: 23, width: "100%", margin: "23px auto 0 auto" }} src={ LogoutIcon } width={ 40 } height={ 40 } alt=""/>
				</LogoutContainer>

				<AddProject open={ this.state.openDialog } closeDialog={ this.toggleDialog }/>
			</Drawer>
		)
	}
}

export default MainDrawer;