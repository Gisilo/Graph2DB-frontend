import gql from 'graphql-tag'

export const CREATE_QUERY = gql`
	mutation CreateGrabit($nameGrabit: String!, $descr: String) {
		createGrabit(input: {nameProject: $nameGrabit, description: $descr}) {
			grabit {
		  		id
		  		nameProject
		  		description
		  	}
		}
	}`;

export const SAVE_QUERY = gql`
	mutation CreateGrabitByName($nameGrabit: String!, $nGraph: String!) {
	  createGrabit(input: {nameProject: $nameGrabit, graph: $nGraph}) {
		msg
		grabit {
		  nameProject
		}
	  }
    }`;

export const LOAD_QUERY = gql`
    query GetGrabitByName($projectName: String!) {
      allGrabits(nameProject: $projectName) {
        edges {
          node {
            id
            nameProject
            nameDb
            dbms
            description
            port
            createdDate
            updateDate
            graph
          }
        }
      }
    }`;

export const DELETE_QUERY = gql`
    mutation DeleteGrabitByName($nameGrabit: String!) {
        deleteGrabit(input: {nameProject: $nameGrabit}) {
            msg
        }
    }`;

export const GET_ALL_GRABITS_QUERY = gql`
  query GetAllGrabits {
    allGrabits {
      edges {
        node {
          id
          nameProject
          description
          updateDate
        }
      }
    }
  }`;

export const SIGNUP_MUT = gql`
    mutation SignUp($username: String!, $email: String!, $password1: String!, $password2: String!){
        register(
            input: {
                email:$email,
                username:$username,
                password1: $password1,
                password2:$password2
            }
        ) {
            success,
            errors,
            token,
            refreshToken
        }
    }`;

export const LOG_IN_MUT = gql`
    mutation SignIn($username: String!, $password: String!){
        tokenAuth(
            input: {
                username: $username,
                password: $password,
            }
        ) {
            success,
            errors,
            token,
            refreshToken,
            unarchiving,
            user {
                id,
                username
            }
        }
    }`;