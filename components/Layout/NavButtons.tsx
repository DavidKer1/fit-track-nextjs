import { Button, Container, Row, Spacer, Text } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
export default function NavButtons() {
  const router = useRouter()

  return (
    <Container fluid>
      <Row>
        <Link passHref href="/">
          <Button
            rounded
            light={router.pathname !== "/"}
            css={{
              fontSize: 16,
              py: 24,
              fontWeight: router.pathname === "/" ? "$semibold" : "$normal",
              color: router.pathname === "/" ? "$white" : "$primary",
            }}
          >
            Dashboard
          </Button>
        </Link>
      </Row>
      <Spacer y={1} />
      <Row>
        <Link passHref href="/workout">
          <Button
            rounded
            light={router.pathname !== "/workout"}
            css={{
              fontSize: 16,
              py: 24,
              fontWeight:
                router.pathname === "/workout" ? "$semibold" : "$normal",
              color: router.pathname === "/workout" ? "$white" : "$primary",
            }}
          >
            Workout
          </Button>
        </Link>
      </Row>
    </Container>
  )
}
