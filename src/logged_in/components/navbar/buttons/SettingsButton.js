import React from 'react';
import NavBarIconButton from "./NavBarIconButton";
import {SETTINGS_URL} from "../../../../common/costants/urls";
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import {withRouter} from "react-router-dom";

function SettingsButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="settings button"
            onClick={() => history.push(SETTINGS_URL)}
            menuId={menuId}
            icon={<SettingsApplicationsOutlinedIcon />}/>

    );
}

export default withRouter(SettingsButton);
