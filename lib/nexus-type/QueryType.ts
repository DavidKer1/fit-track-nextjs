import { nonNull, objectType, stringArg } from "nexus"
import prisma from "../prisma"

const Query = objectType({
  name: "Query",
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
  },
})


export default Query