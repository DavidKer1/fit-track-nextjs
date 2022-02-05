import { objectType, stringArg } from "nexus"
import prisma from "../prisma"

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nullable.field('deleteAccount', {
      type: 'Account',
      args: {
        accountId: stringArg(),
      },
      resolve: (_, { accountId }, ctx) => {
        return prisma.account.delete({
          where: { id: String(accountId) },
        })
      },
    })
  },
})

export default Mutation
