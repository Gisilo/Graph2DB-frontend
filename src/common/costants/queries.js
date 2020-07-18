import gql from "graphql-tag";

export const CREATE_MUT = gql`
  mutation CreateGrabit(
    $nameGrabit: String!
    $descr: String
    $owner: String!
  ) {
    createGrabit(
      input: { name: $nameGrabit, description: $descr, owner: $owner }
    ) {
      grabit {
        id
        name
        description
      }
    }
  }
`;

export const SAVE_MUT = gql`
  mutation SaveGrabit($id: String!, $owner: String!, $graph: String!) {
    createGrabit(input: { id: $id, owner: $owner, graph: $graph }) {
      msg
      grabit {
        id
      }
    }
  }
`;

export const LOAD_QUERY = gql`
  query GetGrabit($id: String!, $owner: String!) {
    allGrabits(id: $id, owner: $owner) {
      edges {
        node {
          name
          graph
        }
      }
    }
  }
`;

export const DELETE_MUT = gql`
  mutation DeleteGrabit($grabitName: String!) {
    deleteGrabit(input: { name: $grabitName }) {
      msg
    }
  }
`;

export const GET_ALL_GRABITS_QUERY = gql`
  query GetAllGrabits {
    allGrabits {
      edges {
        node {
          id
          name
          description
          updateDate
        }
      }
    }
  }
`;

export const GET_GRABITS_OF_OWNER = gql`
  query GetGrabitsOfOwner($owner: String!) {
    getGrabitsOfOwner(owner: $owner ) {
      id
      name
      description
      updateDate
    }
  }
`;

export const GET_GRABITS_BY_ID_AND_OWNER = gql`
  query GetGrabitsByIdAndOwner($id: String!, $owner: String!){
    getGrabitsByIdAndOwner(id: $id, owner: $owner ) {
      id
      name
      description
      updateDate
      graph
    }
  }
`;

export const SIGNUP_MUT = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      input: {
        email: $email
        username: $username
        password1: $password1
        password2: $password2
      }
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const LOG_IN_MUT = gql`
  mutation SignIn($username: String!, $password: String!) {
    tokenAuth(input: { username: $username, password: $password }) {
      success
      errors
      token
      refreshToken
      unarchiving
      user {
        pk
        username
      }
    }
  }
`;
