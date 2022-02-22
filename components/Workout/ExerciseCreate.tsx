import { Button, Input, Spacer } from "@nextui-org/react"
import { motion } from "framer-motion"
import type { Category } from "@/types/Category"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CreateExerciseMutation } from "@/gql/mutation.graphql"

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
type TProps = {
  initialName: string
  onNameChange: (name: string) => void
  category: Category | null
  direction: "left" | "right"
  handleCategorySelect: () => void
  handleExercisesSelect: () => void
}
export default function ExerciseCreate(props: TProps) {
  const { handleCategorySelect, handleExercisesSelect, category, direction, initialName, onNameChange} =
    props
  const [name, setName] = useState(initialName ?? "")
  const [createExercise, { loading, error, data }] = useMutation(
    CreateExerciseMutation
  )
  const handleCreate = async () => {
    await createExercise({
      variables: {
        name,
        categoryId: category?.id,
      },
    })
    onNameChange("")
    handleExercisesSelect()
  }
  const disabledButton = !name || !category
  return (
    <motion.div
      variants={variants}
      key="exercise-selector2"
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      style={{
        position: "absolute",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <Button.Group css={{ d: "flex" }} color="secondary">
        <Button css={{ flex: 1 }} disabled={!category} animated={false}>
          {category?.name ?? "No selected"}
        </Button>
        <Button onClick={handleCategorySelect} light ghost>
          Select Category
        </Button>
      </Button.Group>
      <Spacer y={2} />
      <Input
        labelPlaceholder="Name"
        color="secondary"
        onChange={e => {
          setName(e.target.value)
          onNameChange(e.target.value)
        }}
        value={name}
      />
      <Spacer y={1} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color={"secondary"}
          auto
          disabled={disabledButton}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </motion.div>
  )
}
