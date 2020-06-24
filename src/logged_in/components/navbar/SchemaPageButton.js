import React from 'react';
import {COVERT_URL} from "../../../shared/costants/urls";
import withRouter from "react-router-dom/es/withRouter";
import NavBarIconButton from "./NavBarIconButton";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

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
