import React from 'react';
import { Grid } from '@material-ui/core';
import NavBar from './NavBar';
import TabsContainer from './TabsContainer';
import SideNav from "./SideNav";
import LabTabs from "./LabTabs";
import {makeStyles} from "@material-ui/core/styles";

function MainPage(props) {
	return (
		<div>
			<SideNav/>
			<LabTabs/>
		</div>
	);
}

export default MainPage;