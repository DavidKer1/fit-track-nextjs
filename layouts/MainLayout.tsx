import Navbar from "@/components/Layout/Navbar"
import Sidebar from "@/components/Layout/Sidebar"
import { Container, Grid, Spacer, useTheme } from "@nextui-org/react"
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          overflow: "hidden",
          background: theme.colors.gray100.value,
        }}
      >
        <Sidebar />
        <Container>
          <Spacer y={3} />
          {children}
        </Container>
      </div>
    </div>
  )
}

export default DashboardLayout
