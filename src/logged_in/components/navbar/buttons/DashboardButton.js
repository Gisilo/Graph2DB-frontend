import React from 'react';
import {ROOT_URL} from "../../../../shared/costants/urls";
import DashboardIcon from "@material-ui/icons/Dashboard";
import withRouter from "react-router-dom/es/withRouter";
import NavBarIconButton from "./NavBarIconButton";

function DashboardButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="dashboard button"
            onClick={() => history.push(ROOT_URL)}
            menuId={menuId}
            icon={<DashboardIcon />}/>

    );
}

export default withRouter(DashboardButton);
