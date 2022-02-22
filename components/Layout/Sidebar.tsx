import {
  Button,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
  useTheme,
} from "@nextui-org/react"

import type { FC } from "react"
import Logo from "@/components/Logo"
import NavButtons from "./NavButtons"
import { signOut } from "next-auth/react"

const Sidebar: FC = () => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: theme.colors.white.value,
        display: "flex",
      }}
    >
      <Container
        fluid
        css={{
          padding: "$20 $10 ",
          flexDirection: "column",
        }}
        display="flex"
        alignItems="flex-start"
      >
        <Row justify="center">
          <Logo />
        </Row>
        <Spacer y={4} />
        <Row justify="center" css={{ flex: 1 }}>
          <NavButtons />
        </Row>
        <Spacer y={1} />
        <Row justify="center">
          <Button
            rounded
            light
            onClick={() =>
              signOut({ callbackUrl: "http://localhost:3000/login" })
            }
            css={{
              fontSize: 16,
              color: "$primary",
            }}
          >
            Sign Out
          </Button>
        </Row>
        <Spacer y={3} />
      </Container>
    </div>
  )
}
export default Sidebar
