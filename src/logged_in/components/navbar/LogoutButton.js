import React from 'react';
import {ROOT_URL} from "../../../shared/costants/urls";
import {ExitToApp} from "@material-ui/icons";
import withRouter from "react-router-dom/es/withRouter";
import NavBarIconButton from "./NavBarIconButton";

function LogoutButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="log out button"
            onClick={() => history.push(ROOT_URL)}
            menuId={menuId}
            icon={<ExitToApp />}/>

    );
}

export default withRouter(LogoutButton);
