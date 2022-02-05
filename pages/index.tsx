import WorkoutChart from "@/components/Workout/WorkoutChart"
import MainLayout from "@/layouts/MainLayout"
import { NextPage } from "@/types/NextPage"
import { Button, Col, Container, Row, Text } from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <>
    <Head>
      <title>Dashboard | FitTrack</title>
    </Head>
    <Container>
      <Row align="center">
        <Col>
          <Text color={"primary"} h3 size={45} weight={"medium"}>
            Dashboard
          </Text>
        </Col>
        <Col css={{ justifyContent: "flex-end", display: "flex" }}>
          <Link passHref href="/workout">
            <Button color={"secondary"} auto>
              New Workout
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <WorkoutChart />
        </Col>
      </Row>
    </Container>
    </>
  )
}

Home.auth = true
Home.getLayout = page => <MainLayout>{page}</MainLayout>
export default Home
