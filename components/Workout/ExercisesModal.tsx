import { useMemo, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"

import ExerciseCreate from "@/components/Workout/ExerciseCreate"
import ExerciseSelector from "@/components/Workout/ExerciseSelector"
import BasicModal from "@/components/Modals/BasicModal"
import ControlFooterModal from "@/components/Modals/ControlFooterModal"
import CategoriesSelector from "./CategoriesSelector"
import { NexusGenFieldTypes } from "generated/nexus-typegen"
import type { Category } from "@/types/Category"

const variants = {
  exercises: { height: 400 },
  create: { height: 300 },
  category: { height: 300 },
}
const transition = {
  heigth: { type: "spring", stiffness: 300, damping: 30 },
}

type TProps = {
  isVisible: boolean
  closeModal: () => void
}

const COMPONENTS = ["exercises", "create", "category"] as const
type TComponent = typeof COMPONENTS[number]
const PRIMARY_BUTTON_TEXT: { [key in TComponent]: string } = {
  exercises: "Create Exercise",
  create: "Back to Exercises",
  category: "Back",
}
const PRIMARY_BUTTON_ACTION: { [key in TComponent]: TComponent} = {
  exercises: "create",
  create: "exercises",
  category: "create",
}

type Components = typeof COMPONENTS[number]

export default function ExercisesModal(props: TProps) {
  const { isVisible, closeModal } = props
  const [component, setComponent] = useState<Components>("exercises")
  const [category, setCategory] = useState<Category | null>(null)
  const [temporalExerciseName, setTemporalExerciseName] = useState("")
  const closeHandler = () => {
    if (component === "category") setComponent("create")
    closeModal()
  }
  const changeToComponent = (comp: Components) => {
    setComponent(comp)
  }
  const controlButtons = useMemo(
    () => [
      {
        text: PRIMARY_BUTTON_TEXT[component], 
        onClick: () => changeToComponent(PRIMARY_BUTTON_ACTION[component]),
        props: {
          light: component === "create" || component === "category",
          color: "primary" as const,
        },
      },
    ],
    [component]
  )
  const modalTitle = useMemo(
    () => ({
      create: "Create new exercise",
      exercises: "Exercises",
      category: "Select Category",
    }),
    [component]
  )
  const handleCategorySelect = (
    category: NexusGenFieldTypes["ExerciseCategory"]
  ) => {
    setCategory(category)
    changeToComponent("create")
  }
  const direction = useMemo(() => component === 'exercises' ? 'right' : 'left', [component])
  return (
    <BasicModal
      isVisible={isVisible}
      onCloseModal={closeHandler}
      title={modalTitle[component]}
      FooterComponent={
        <ControlFooterModal
          onCloseModal={component !== "category" && closeHandler}
          controlButtons={controlButtons}
        />
      }
      animationBodyProps={{
        variants,
        animate: component,
        transition: transition,
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        {component === "exercises" && (
          <ExerciseSelector onSelect={closeHandler} direction={direction}/>
        )}
        {component === "category" && (
          <CategoriesSelector onSelect={handleCategorySelect} direction={direction} />
        )}

        {component === "create" && (
          <ExerciseCreate
            direction={direction}
            category={category}
            handleCategorySelect={() => {
              changeToComponent("category")
            }}
            initialName={temporalExerciseName}
            onNameChange={setTemporalExerciseName}
            handleExercisesSelect={() => {
              changeToComponent("exercises")
            }}
          />
        )}
      </AnimatePresence>
    </BasicModal>
  )
}
