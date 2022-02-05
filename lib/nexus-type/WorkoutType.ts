import { objectType } from "nexus"
import prisma from "../prisma"
const Workout = objectType({
  name: "Workout",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("name")
    t.nonNull.date("date")
    t.nonNull.boolean("finished")
    t.nonNull.field("user", {
      type: "User",
      resolve: parent => {
        return prisma.workout.findUnique({
          where: {
            id: parent.id,
          }
        }).user()
      }
    })
    t.list.field("exercisesWorkout", {
      type: "ExerciseWorkout",
      resolve: (parent) => {
        return prisma.workout.findUnique({
          where: {
            id: parent.id
          }
        }).exercisesWorkout()
      }
    })
  },
})

export default Workout
