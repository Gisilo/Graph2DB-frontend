import gql from "graphql-tag";

export const CREATE_MUT = gql`
  mutation CreateGrabit(
    $nameGrabit: String!
    $descr: String
    $userName: String!
  ) {
    createGrabit(
      input: { name: $nameGrabit, description: $descr, owner: $userName }
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
  mutation CreateGrabitByName($nameGrabit: String!, $nGraph: String!) {
    createGrabit(input: { name: $nameGrabit, graph: $nGraph }) {
      msg
      grabit {
        name
      }
    }
  }
`;

export const LOAD_QUERY = gql`
  query GetGrabitByName($projectName: String!) {
    allGrabits(name: $projectName) {
      edges {
        node {
          id
          name
          description
          creationDate
          updateDate
          graph
        }
      }
    }
  }
`;

export const DELETE_MUT = gql`
  mutation DeleteGrabitByName($grabitName: String!) {
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
