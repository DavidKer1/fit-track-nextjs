import { nonNull, objectType, stringArg } from "nexus"
import prisma from "../prisma"

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createCategory", {
      type: "ExerciseCategory",
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_, { name }, ctx) => {
        return prisma.exerciseCategory.create({
          data: {
            name: name,
          },
        })
      },
    })

    t.field("createExercise", {
      type: "Exercise",
      args: {
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        categoryId: nonNull(stringArg()),
      },
      resolve: (_, { name, categoryId, userId }) => {
        return prisma.exercise.create({
          data: {
            name: name,
            category: {
              connect: {
                id: categoryId,
              },
            },
            user: {
              connect: {
                id: userId,
              }
            }
          },
        })
      },
    })
  },
})

export default Mutation
