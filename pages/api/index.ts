import { ApolloServer } from "apollo-server-micro"
import { DateTimeResolver } from "graphql-scalars"
import { asNexusMethod, makeSchema } from "nexus"
import path from "path"
import cors from "micro-cors"
import prisma from "../../lib/prisma"
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

export const GQLDate = asNexusMethod(DateTimeResolver, "date")

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
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ schema })

let apolloServerHandler: (
  req: MicroRequest,
  res: ServerResponse
) => Promise<void>

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    })
  }

  return apolloServerHandler
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === "OPTIONS") {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
