import React from 'react';
import {ROOT_URL} from "../../../../common/costants/urls";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NavBarIconButton from "./NavBarIconButton";
import {withRouter} from "react-router-dom";

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
