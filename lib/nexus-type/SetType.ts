import { objectType } from "nexus"
import prisma from "../prisma"
const Set = objectType({
  name: "Set",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.nonNull.int("reps")
    t.nonNull.int("weight")
    t.nonNull.field("exerciseWorkout", {
      type: "ExerciseWorkout",
      resolve: parent => {
        return prisma.set
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .exerciseWorkout()
      },
    })
  },
})

export default Set
