import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';


class DeleteButton extends React.Component {

    deleteProject = () => {
        this.props.client.mutate({
            mutation: gql
                `mutation DeleteGrabitByName{
                    deleteGrabit(
                        input: {
                            nameProject: "prova6"
                    }){
                        msg
                    }
                }`
        }).then(
            (success) => console.log("suc", success.data.deleteGrabit.msg),
            (error) => console.log("err", error))

    };

    render() {
        return (
            <Button onClick={this.deleteProject} className="px-5" variant={this.props.variant}>
                {this.props.text}
            </Button>

        );
    }

}

export default withApollo(DeleteButton);
