import React, {useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { GET_GRABITS_OF_OWNER } from "../../../../common/costants/queries";
import Fab from "@material-ui/core/Fab";
import ModalGrabitCreation from "./ModalGrabitCreation";
import GrabitList from "./GrabitList";
import {authenticationService} from "../../../../common/services/authenticationService";
import {atom, useRecoilState} from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  fab: {
    top: "auto",
    right: 30,
    bottom: 30,
    left: "auto",
    position: "fixed",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const grabitNamesState = atom({
  key: 'grabitNames', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const grabitIDState = atom({
  key: 'grabitID', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export function GrabitsPanel() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [grabitNames, setGrabitNames] = useRecoilState(grabitNamesState);

  const { loading, error, data } = useQuery(
      GET_GRABITS_OF_OWNER,
      {variables: { owner:authenticationService.currentUserID }
  });

  useEffect(() => {
    if (data){
      setGrabitNames(data.getGrabitsOfOwner.map(grabit => grabit.name));
    }
  }, [data, setGrabitNames]);

  if (loading) return <LinearProgress color="secondary" />;
  if (error) return <div>`Error! ${error.message}`</div>;
  //setGrabitNames(data.getGrabitsOfOwner.map(grabit => grabit.name));

  return (
    <div className={classes.root}>
      <GrabitList grabits={data.getGrabitsOfOwner}/>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add grabit"
        className={classes.fab}
        onClick={handleClickOpenModal}
      >
        <AddIcon className={classes.extendedIcon} />
        Create Grabit
      </Fab>
      <ModalGrabitCreation open={openModal} handleClose={handleCloseModal} grabitNames={grabitNames} />
    </div>
  );
}
