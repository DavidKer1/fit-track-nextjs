import { Button, Modal, Spacer, Text } from "@nextui-org/react"
import { IconType } from "react-icons/lib"
import { motion } from "framer-motion"
import type { AnimationProps } from "framer-motion"

type TProps = {
  isVisible: boolean
  onCloseModal: () => void
  blur?: boolean
  IconComponent?: IconType
  title?: string
  children?: React.ReactNode
  FooterComponent?: React.ReactNode
  animationBodyProps?: AnimationProps
}
export default function BasicModal(props: TProps) {
  const {
    isVisible,
    onCloseModal,
    blur,
    IconComponent,
    title,
    children,
    FooterComponent,
    animationBodyProps,
  } = props
  return (
    <Modal
      aria-labelledby="modal-title"
      open={isVisible}
      onClose={onCloseModal}
      blur
    >
      <Modal.Header css={{ paddingTop: "$md" }}>
        {IconComponent && (
          <>
            <IconComponent size={18} />
            <Spacer x={0.5} />
          </>
        )}
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body
        css={{
          overflowX: "hidden",
        }}
      >
        <motion.div
          {...animationBodyProps}
          style={{
            position: "relative",
          }}
        >
          {children}
        </motion.div>
      </Modal.Body>
      <Modal.Footer>
        {FooterComponent ? (
          FooterComponent
        ) : (
          <Button onClick={onCloseModal} auto flat color="error">
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
