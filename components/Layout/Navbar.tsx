import { Button, Text, useTheme } from "@nextui-org/react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import type { FC } from "react"
const Navbar: FC = () => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.colors.white.value,
        padding: `${theme.space.xs} ${theme.space.sm}`,
        alignItems: "center",
      }}
    >
      <Text
        css={{
          textGradient: "45deg, $purple500 -20%, $pink500 100%",
        }}
        weight={"bold"}
        h2
      >
        <Link href="/">
          <a>FitTrack</a>
        </Link>
      </Text>
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
    </div>
  )
}

export default Navbar
