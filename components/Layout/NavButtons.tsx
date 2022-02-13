import { Button, Container, Row, Spacer, Text } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoSave } from "react-icons/io5"
export default function NavButtons() {
  const router = useRouter()
  return (
    <Container fluid>
      <Row>
        <Link passHref href="/">
          <Button
            rounded
            light={router.pathname !== "/"}
            css={{ fontSize: 16, py: 24, fontWeight: "$semibold" , justifyContent: 'center' ,display: 'flex'}}
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
            css={{ fontSize: 16, py: 24, fontWeight: "$semibold" }}
          >
            Workout
          </Button>
        </Link>
      </Row>
    </Container>
  )
}
