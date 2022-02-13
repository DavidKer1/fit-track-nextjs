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

const Sidebar: FC = () => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: theme.colors.white.value,
      }}
    >
      <Container
        fluid
        css={{
          padding: "$20 $10",
        }}
      >
        <Row justify="center">
          <Logo />
        </Row>
        <Spacer y={4} />
        <Row justify="center">
          <NavButtons />
        </Row>
      </Container>
    </div>
  )
}
export default Sidebar
