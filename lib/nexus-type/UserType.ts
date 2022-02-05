const User = objectType({
  name: "User",
  definition(t) {
    t.int("id")
    t.string("name")
    t.string("email")
    t.list.field("posts", {
      type: "Post",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .Accounts(),
    })
    t.field("profile", {
      type: "Profile",
      resolve: parent => {
        return prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .profile()
      },
    })
  },
})

export default User