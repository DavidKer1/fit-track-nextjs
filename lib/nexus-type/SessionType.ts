import { objectType } from "nexus"
import prisma from "../prisma"
const Session = objectType({
  name: "Session",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("sessionToken")
    t.nonNull.string("userId")
    t.nonNull.date("expires")
    t.field("user", {
      type: "User",
      resolve: (parent) => {
        return prisma.session.findUnique({
          where: {
            id: String(parent.id)
          }
        })
        .user()
      }
    })
  },
})

export default Session
