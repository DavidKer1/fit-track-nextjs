import MainLayout from "@/layouts/MainLayout"
import { Button, Col, Container, Row, Text } from "@nextui-org/react"
import { prisma } from "@prisma/client"
import {  useSession } from "next-auth/react"
import Head from "next/head"
import type { NextPage } from "@/types/NextPage"
import { IoSave } from "react-icons/io5"
const Workout: NextPage = () => {
  const { data: session, status } = useSession()
  const handleAddExercise = async () => {
  }
  return (
    <>
      <Head>
        <title>Dashboard | FitTrack</title>
      </Head>
      <Container>
        <Row align="center">
          <Col>
            <Text color={"primary"} h3 size={45} weight={"medium"}>
              Workout
            </Text>
          </Col>
          <Col css={{ justifyContent: "flex-end", display: "flex" }}>
            <Button color={"error"} auto icon={<IoSave size={20}/>}>
            </Button>
          </Col>
        </Row>
        <Row align="center">
          <Col css={{ justifyContent: "space-between", display: "flex" }}>
            <Button color={"secondary"} auto bordered  rounded>
              Select Workout
            </Button>
            <Button color={"secondary"} auto shadow onClick={handleAddExercise}>
              Add Exercise
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Workout.auth= true
Workout.getLayout = page => <MainLayout>{page}</MainLayout>
export default Workout
