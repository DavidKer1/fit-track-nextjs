import { Button } from "@nextui-org/react"
import { ButtonProps } from "@nextui-org/react"

type ControlButton = {
  text?: string
  onClick?: () => void
  props?: ButtonProps
}

type TProps = {
  onCloseModal?: () => void
  closeModalText?: string
  closeModalProps?: ButtonProps
  controlButtons?: ControlButton[]
}
export default function ControlFooterModal(props: TProps) {
  const {
    onCloseModal,
    controlButtons = [],
    closeModalProps,
    closeModalText,
  } = props
  return (
    <>
      {onCloseModal && (
        <Button
          auto
          flat
          color="error"
          onClick={onCloseModal}
          {...closeModalProps}
        >
          {closeModalText || "Close"}
        </Button>
      )}
      {controlButtons.map(({ text, onClick, props }) => (
        <Button key={text} auto onClick={onClick} {...props}>
          {text}
        </Button>
      ))}
    </>
  )
}
