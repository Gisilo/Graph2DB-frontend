import React from "react";
import GrabitCard from "./GrabitCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_MUT } from "../../../../common/costants/queries";
import { Grid } from "@material-ui/core";
import {authenticationService} from "../../../../common/services/authenticationService";

export default function GrabitList(props) {
  const [deleteGrabit] = useMutation(DELETE_MUT);
  const [grabits, setGrabits] = React.useState(props.grabits);

  const removeGrabitFromList = (name) => {
    deleteGrabit({
      variables: {
        grabitName: name,
        owner: authenticationService.currentUserValue.pk,
      },
    }).then(
      (response) => {
        console.log("success", response);
        setGrabits(grabits.filter((grabit) => grabit.name !== name));
      },
      (error) => console.error("error", error)
    );
  };

  return (
    <List aria-label="grabits list">
      {grabits && grabits.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate)).map((grabit) => {
        return (
          <ListItem key={grabit.id}>
            <Grid container justify="center">
              <GrabitCard
                grabitID={grabit.id}
                grabitName={grabit.name}
                description={grabit.description}
                updateDate={grabit.updateDate}
                removeGrabitFromList={() => removeGrabitFromList(grabit.name)}
              />
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
}
