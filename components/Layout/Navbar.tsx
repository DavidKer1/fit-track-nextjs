import { Button, Container, Grid, Text, useTheme } from "@nextui-org/react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import type { FC } from "react"
import Logo from "@/components/Logo"
const Navbar: FC = () => {
  const { theme } = useTheme()
  return (
    <Grid.Container
      justify="space-between"
      css={{
        padding: `${theme.space.xs} ${theme.space.sm}`,
        alignItems: "center",
        display: "none",
        '@mdMax': {
          display: "flex",
        },
      }}
    >
      <Grid>
        <Logo />
      </Grid>
      <Grid>
        <Button
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/login" })
          }}
          color={"primary"}
          size={"sm"}
          light
        >
          Sign Out
        </Button>
      </Grid>
    </Grid.Container>
  )
}

export default Navbar
