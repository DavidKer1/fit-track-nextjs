import gql from "graphql-tag"
export const ExercisesQuery = gql`
  query Exercises {
    exercises {
      id
      name
      category {
        name
        id
      }
    }
  }
`
