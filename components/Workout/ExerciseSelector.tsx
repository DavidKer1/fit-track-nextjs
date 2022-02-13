import { useQuery } from "@apollo/client"
import { Button, Text, Container, Spacer } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useState } from "react"
import type { NexusGenFieldTypes } from "../../generated/nexus-typegen"
import { ExercisesQuery } from "../../gql/queries.graphql"
type TProps = {
  onSelect: (id?: string) => void
}

const variants = {
  enter: (direction: "left" | "right") => {
    return {
      x: direction === "left" ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: "left" | "right") => {
    return {
      zIndex: 0,
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }
  },
}
export default function ExerciseSelector(props: TProps) {
  const { loading, error, data } = useQuery<{
    exercises: NexusGenFieldTypes["Exercise"][]
  }>(ExercisesQuery, {
    fetchPolicy: "cache-and-network",
  })
  if (loading) {
    return null
  }
  if (error) {
    return <div> Was an error requesting exercises, please try again later</div>
  }

  return (
    <motion.div
      variants={variants}
      key="exercise-selector"
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        position: "absolute",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      {data?.exercises.map(exercise => (
        <>
          <Button key={exercise.id}>{exercise.name}</Button>
          <Spacer y={0.5} />
        </>
      ))}
    </motion.div>
  )
}
