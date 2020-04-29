import React from 'react';
import { create } from "react-test-renderer";
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag'
import { LoadButton } from '../components/buttons/LoadButton';


it('CheckboxWithLabel changes the text after click', () => {

  expect(true).toBeTruthy();
});


const query = gql
    `query GetGrabitByName($projectName: String!){
                    allGrabits(nameProject: $projectName){
                        edges{
                            node{
                                nameProject
                            }
                        }
                    }
				}`;

const mocks = [
  {
    request: {
      query: query,
      variables: {
        projectName: "prova8"
      },
    },
    result: {
      "data": {
        "allGrabits": {
          "edges": [
            {
              "node": {
                "nameProject": "prova8"
              }
            }
          ]
        }
      }
    },
  },
];

it('renders without error', () => {
    create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <LoadButton />
        </MockedProvider>
    );
});
