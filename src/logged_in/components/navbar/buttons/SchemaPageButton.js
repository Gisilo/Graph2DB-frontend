import React from 'react';
import {COVERT_URL} from "../../../../common/costants/urls";
import NavBarIconButton from "./NavBarIconButton";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import {withRouter} from "react-router-dom";

function SchemaPageButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="schema page button"
            onClick={() => history.push(COVERT_URL)}
            menuId={menuId}
            icon={<SaveAltIcon />}/>
    );
}

export default withRouter(SchemaPageButton);
