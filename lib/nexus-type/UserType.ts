import { objectType } from "nexus"
import prisma from "../prisma"
const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id")
    t.string("name")
    t.string("email")
    t.date("emailVerified")
    t.string("image")

    t.nonNull.list.field("accounts", {
      type: "Account",
      resolve: parent => {
        return prisma.user
          .findUnique({
            where: {
              id: String(parent.id),
            },
          })
          .accounts()
      },
    })
    t.list.field("sessions", {
      type: "Session",
      resolve: parent => {
        return prisma.user
          .findUnique({
            where: {
              id: String(parent.id),
            },
          })
          .sessions()
      },
    })
    t.list.field("workouts", {
      type: "Workout",
      resolve: parent => {
        return prisma.user
          .findUnique({
            where: {
              id: String(parent.id),
            },
          })
          .workouts()
      },
    })
    t.list.field("exercises", {
      type: "Exercise",
      resolve: parent => {
        return prisma.user.findUnique({
          where: {
            id: String(parent.id),
          },
        }).exercises()
      },
    })
  },
})

export default User
