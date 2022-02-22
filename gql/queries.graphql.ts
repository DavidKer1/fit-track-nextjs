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

export const CategoriesQuery = gql`
  query Categories {
    categories {
      name
      id
    }
  }
`
