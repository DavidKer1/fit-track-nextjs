import { objectType } from "nexus"
import prisma from "../prisma"


const ExerciseWorkout = objectType({
  name: "ExerciseWorkout",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.field("workout", {
      type: "Workout",
      resolve: parent => {
        return prisma.exerciseWorkout
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .workout()
      },
    })
    t.nonNull.field("exercise", {
      type: "Exercise",
      resolve: parent => {
        return prisma.exerciseWorkout.findUnique({
          where: {
            id: parent.id
          }
        }).exercise()
      }
    })
    t.list.field("sets", {
      type: "Set",
      resolve: parent => {
        return prisma.exerciseWorkout
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .sets()
      },
    })
  },
})

export default ExerciseWorkout
