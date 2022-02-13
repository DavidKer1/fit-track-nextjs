import { nonNull, objectType, stringArg, queryType } from "nexus"
import prisma from "../prisma"

const Query = queryType({
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.user.findUnique({
          where: { id: String(args.userId) },
        })
      },
    })

    t.list.field("exercises", {
      type: "Exercise",
      resolve: (_, _args, ctx) => {
        return prisma.user
          .findUnique({
            where: { email: ctx.session.user.email},
          })
          .exercises()
      },
    })
  },
})

export default Query
