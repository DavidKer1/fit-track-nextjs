import { ApolloServer } from "apollo-server-micro"
import { DateTimeResolver } from "graphql-scalars"
import { asNexusMethod, makeSchema } from "nexus"
import path from "path"
import cors from "micro-cors"
import type { NextApiRequest, NextApiResponse } from "next"
import { MicroRequest } from "apollo-server-micro/dist/types"
import { ServerResponse } from "http"
import {
  Query,
  Mutation,
  User,
  Account,
  Session,
  Set,
  Exercise,
  ExerciseWorkout,
  ExerciseCategory,
  Workout,
} from "../../lib/nexus-type"
import { getSession } from "next-auth/react"
export const GQLDate = asNexusMethod(DateTimeResolver, "date")

// TODO: Delete in production
const testSession = {
  user: {
    name: "David Ker Games",
    email: "davizz117@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhSfpWXg-exonzXebFhhvrK1PXLPq7_yQh7TxAtIg=s96-c",
  },
  expires: "2022-03-15T00:12:47.518Z",

}
export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Account,
    Session,
    Set,
    Exercise,
    ExerciseWorkout,
    ExerciseCategory,
    Workout,
    GQLDate,
  ],
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "./api/context.ts"),
    alias: "ContextModule",
    export: "Context",
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

let apolloServerHandler: (
  req: MicroRequest,
  res: ServerResponse
) => Promise<void>

async function getApolloServerHandler() {
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = await req.headers.authorization
      if (token) {
        return {
          session: testSession
        }
      }
      const session = await getSession({ req })
      return { session }
    },
  })
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    })
  }

  return apolloServerHandler
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await req.headers.authorization

  const apolloServerHandler = await getApolloServerHandler()
  if (req.method === "OPTIONS") {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
