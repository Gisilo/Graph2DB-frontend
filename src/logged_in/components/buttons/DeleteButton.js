import React from 'react';
import { useMutation } from 'react-apollo';

import { DELETE_MUT } from '../../../common/costants/queries'


function DeleteButton(props){

    const [deleteGrabitMutation] = useMutation(DELETE_MUT);

    const deleteGrabit = () => {

        deleteGrabitMutation({
            variables: {
                nameGrabit: "simone",
            }
        }).then((success) => console.log('success', success), (error) => console.log('error', error));
    };

    return (
        <button onClick={deleteGrabit} className="px-5" variant={props.variant}>
            {props.text}
        </button>

    );
}

export default DeleteButton;
