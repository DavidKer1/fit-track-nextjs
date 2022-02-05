import { objectType } from "nexus"
import prisma from "../prisma"

const Account = objectType({
  name: "Account",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("type")
    t.nonNull.string("provider")
    t.nonNull.string("providerAccountId")
    t.string("refresh_token")
    t.string("access_token")
    t.int("expires_at")
    t.string("token_type")
    t.string("scope")
    t.string("id_token")
    t.string("session_state")
    t.string("oauth_token_secret")
    t.string("oauth_token")
    t.nonNull.field("user", {
      type: "User",
      resolve: (parent) => {
        return prisma.account.findUnique({
          where: {id: String(parent.id)}
        })
        .user()
      }
    })
  },
})

export default Account
