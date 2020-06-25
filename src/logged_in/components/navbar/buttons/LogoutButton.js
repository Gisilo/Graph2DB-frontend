import React from 'react';
import {ROOT_URL} from "../../../../common/costants/urls";
import {ExitToApp} from "@material-ui/icons";
import NavBarIconButton from "./NavBarIconButton";
import {withRouter} from "react-router-dom";
import {authenticationService} from "../../../../common/services/authenticationService";

function LogoutButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="log out button"
            onClick={() => {
                authenticationService.logout();
                history.push(ROOT_URL);
            }}
            menuId={menuId}
            icon={<ExitToApp />}/>

    );
}

export default withRouter(LogoutButton);
