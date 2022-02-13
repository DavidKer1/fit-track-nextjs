import MainLayout from "@/layouts/MainLayout"
import { Button, Col, Container, Row, Text } from "@nextui-org/react"
import Head from "next/head"
import type { NextPage } from "@/types/NextPage"
import { IoSave } from "react-icons/io5"
import ExercisesModal from "@/components/Workout/ExercisesModal"
import { useState } from "react"
import { getSession } from 'next-auth/react';

const Workout: NextPage = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  return (
    <>
      <ExercisesModal
        isVisible={isVisibleModal}
        closeModal={() => setIsVisibleModal(false)}
      />
      <Head>
        <title>Dashboard | FitTrack</title>
      </Head>
      <Container>
        <Row align="center">
          <Col>
            <Text color={"primary"} h3 size={36} weight={"bold"}>
              Workout
            </Text>
          </Col>
          <Col css={{ justifyContent: "flex-end", display: "flex" }}>
            <Button color={"error"} auto icon={<IoSave size={20} />}></Button>
          </Col>
        </Row>
        <Row align="center">
          <Col css={{ justifyContent: "space-between", display: "flex" }}>
            <Button color={"secondary"} auto bordered rounded>
              Select Workout
            </Button>
            <Button color={"secondary"} auto shadow onClick={() => setIsVisibleModal(true)}>
              Add Exercise
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Workout.auth = true
Workout.getLayout = page => <MainLayout>{page}</MainLayout>
export default Workout
