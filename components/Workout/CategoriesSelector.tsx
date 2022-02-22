import { CategoriesQuery } from "@/gql/queries.graphql"
import { Category } from "@/types/Category"
import { useQuery } from "@apollo/client"
import { Button, Spacer } from "@nextui-org/react"
import { motion } from "framer-motion"
import { NexusGenFieldTypes } from "generated/nexus-typegen"
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
  onSelect: (category: Category) => void
  direction: "left" | "right"
}
export default function CategoriesSelector(props: TProps) {
  const { direction, onSelect } = props
  const { loading, error, data } = useQuery<{
    categories: NexusGenFieldTypes["ExerciseCategory"][]
  }>(CategoriesQuery, {
    fetchPolicy: "cache-and-network",
  })
  if (loading) {
    return null
  }
  if (error) {
    return (
      <div> Was an error requesting categories, please try again later</div>
    )
  }

  return (
    <motion.div
      variants={variants}
      key="cateogory-selector"
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
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
      {data?.categories.map(category => (
        <>
          <Button
            key={category.id}
            onClick={() => onSelect(category)}
            color="secondary"
          >
            {category.name}
          </Button>
          <Spacer y={0.5} />
        </>
      ))}
    </motion.div>
  )
}
