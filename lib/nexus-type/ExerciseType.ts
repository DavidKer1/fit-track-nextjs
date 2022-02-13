import { objectType } from "nexus"
import prisma from "../prisma"
const Exercise = objectType({
  name: "Exercise",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.field("category", {
      type: "ExerciseCategory",
      resolve: parent => {
        return prisma.exercise
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .category()
      },
    })
    t.nonNull.field("user", {
      type: "User",
      resolve: parent => {
        return prisma.exercise
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user()
      },
    })
    t.list.field("exercisesWorkout", {
      type: "ExerciseWorkout",
      resolve: parent => {
        return prisma.exercise
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .exercisesWorkout()
      }
    })
  },
})

export default Exercise
