import { motion } from "framer-motion"

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
export default function ExerciseCreate() {
  return (
    <motion.div
      variants={variants}
      key="exercise-selector2"
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        position: "absolute",
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      Crear ejercicio
    </motion.div>
  )
}
