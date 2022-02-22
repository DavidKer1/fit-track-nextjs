import { Text } from "@nextui-org/react"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <Text color={"primary"} weight={"bold"} h3 size={28}>
          FitTrack.
        </Text>
      </a>
    </Link>
  )
}
