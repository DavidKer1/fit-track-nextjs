import { objectType } from "nexus"
import prisma from "../prisma"
const ExerciseCategory = objectType({
  name: "ExerciseCategory",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.list.field("exercises", {
      type: "Exercise",
      resolve: parent => {
        return prisma.exerciseCategory
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .exercises()
      },
    })
  },
})

export default ExerciseCategory
