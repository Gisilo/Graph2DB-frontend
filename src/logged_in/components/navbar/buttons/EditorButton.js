import React from 'react';
import {EDITOR_URL} from "../../../../common/costants/urls";
import GrainIcon from '@material-ui/icons/Grain';
import NavBarIconButton from "./NavBarIconButton";
import {withRouter} from "react-router-dom";

function EditorButton(props) {
    const {menuId, history} = props;
    return (
        <NavBarIconButton
            tooltip="Editor"
            aria_label="editor button"
            onClick={() => history.push(EDITOR_URL)}
            menuId={menuId}
            icon={<GrainIcon />}/>

    );
}

export default withRouter(EditorButton);
