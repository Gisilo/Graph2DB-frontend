import React from 'react';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import withRouter from "react-router-dom/es/withRouter";
import NavBarIconButton from "./NavBarIconButton";

function FeedbackButton(props) {
    const {menuId} = props;
    return (
        <NavBarIconButton
            aria_label="feedback button"
            onClick={() => console.log("Feedback pressed")}
            menuId={menuId}
            icon={<FeedbackOutlinedIcon />}/>

    );
}

export default FeedbackButton;
