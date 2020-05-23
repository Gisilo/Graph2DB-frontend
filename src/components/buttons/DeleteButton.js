import React from 'react';
import gql from 'graphql-tag'
import { Button } from 'react-bootstrap';
import { useMutation } from 'react-apollo';

import { DELETE_QUERY } from '../../costants/queries'


function DeleteButton(props){

    const [deleteGrabitMutation] = useMutation(DELETE_QUERY);

    const deleteGrabit = () => {

        deleteGrabitMutation({
            variables: {
                nameGrabit: "simone",
            }
        }).then((success) => console.log('success', success), (error) => console.log('error', error));
    };

    return (
        <Button onClick={deleteGrabit} className="px-5" variant={props.variant}>
            {props.text}
        </Button>

    );
}

export default DeleteButton;
