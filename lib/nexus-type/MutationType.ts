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
            name,
          },
        })
      },
    })

    t.field("createExercise", {
      type: "Exercise",
      args: {
        name: nonNull(stringArg()),
        categoryId: nonNull(stringArg()),
      },
      resolve: async (_, { name, categoryId },ctx) => {
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
                email: ctx.session.user.email || undefined,
              }
            }
          },
        })
      },
    })
  },
})

export default Mutation
