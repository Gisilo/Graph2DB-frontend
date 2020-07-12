import React from "react";
import { LinearProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { GET_ALL_GRABITS_QUERY } from "../../../../common/costants/queries";
import Fab from "@material-ui/core/Fab";
import ModalGrabitCreation from "./ModalGrabitCreation";
import GrabitList from "./GrabitList";

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

export function GrabitsPanel(props) {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, error, data } = useQuery(GET_ALL_GRABITS_QUERY);

  if (loading) return <LinearProgress color="secondary" />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <GrabitList grabits={data.allGrabits.edges.map((i) => i.node)} />
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
      <ModalGrabitCreation open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}
