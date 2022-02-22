import gql from "graphql-tag"
export const CreateExerciseMutation = gql`
  mutation CreateExercise(
    $name: String!
    $categoryId: String!
  ) {
    createExercise( name: $name, categoryId: $categoryId) {
      id
      name
    }
  }
`
