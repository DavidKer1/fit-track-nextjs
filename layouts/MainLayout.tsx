import Navbar from "@/components/Layout/Navbar"
import { Spacer, useTheme } from "@nextui-org/react"
import type { FC } from "react"

const DashboardLayout: FC = ({ children }) => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        backgroundColor: theme.colors.gray100.value,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Spacer y={1} />

      {children}
    </div>
  )
}

export default DashboardLayout
