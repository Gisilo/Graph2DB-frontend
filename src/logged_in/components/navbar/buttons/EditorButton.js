import React from 'react';
import {EDITOR_URL} from "../../../../common/costants/urls";
import GrainIcon from '@material-ui/icons/Grain';
import withRouter from "react-router-dom/es/withRouter";
import NavBarIconButton from "./NavBarIconButton";

function EditorButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            aria_label="editor button"
            onClick={() => history.push(EDITOR_URL)}
            menuId={menuId}
            icon={<GrainIcon />}/>

    );
}

export default withRouter(EditorButton);
