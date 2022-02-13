import { useState } from "react"
import { Button, Modal, Spacer, Text } from "@nextui-org/react"
import { IoMdFitness } from "react-icons/io"
import { AnimatePresence, motion, useAnimation } from "framer-motion"

import ExerciseCreate from "@/components/Workout/ExerciseCreate"
import ExerciseSelector from "@/components/Workout/ExerciseSelector"
import BasicModal from "@/components/Modals/BasicModal"
import ControlFooterModal from "@/components/Modals/ControlFooterModal"

const variants = {
  exercises: { height: 400 },
  create: { height: 300 },
}
const transition = {
  heigth: { type: "spring", stiffness: 300, damping: 30 },
}

type TProps = {
  isVisible: boolean
  closeModal: () => void
}
export default function ExercisesModal(props: TProps) {
  const { isVisible, closeModal } = props
  const [component, setComponent] = useState<"exercises" | "create">(
    "exercises"
  )
  const closeHandler = () => {
    closeModal()
  }

  const changeComponent = () => {
    setComponent(prev => (prev === "exercises" ? "create" : "exercises"))
  }

  return (
    <BasicModal
      isVisible={isVisible}
      onCloseModal={closeHandler}
      title="Exercises"
      FooterComponent={
        <ControlFooterModal
          onCloseModal={closeHandler}
          controlButtons={[
            {
              text:
                component === "create"
                  ? "View Exercises"
                  : "Create new exercise",
              onClick: changeComponent,
              props: {
                ghost: component === "create",
                color: component === "exercises" ? "primary" : "gradient",
                shadow: component === "create",
              }
            },
          ]}
        />
      }
      animationBodyProps={{
        variants,
        animate: component,
        transition: transition,
      }}
    >
      <AnimatePresence initial={false}>
        {component === "exercises" && (
          <ExerciseSelector onSelect={closeHandler} />
        )}
        {component === "create" && <ExerciseCreate />}
      </AnimatePresence>
    </BasicModal>
  )
}
