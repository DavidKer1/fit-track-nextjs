import { createTheme } from "@nextui-org/react"

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "rgba(24,34,119)",
      secondary: "$pink300",
    },
    space: {},
    fonts: {
      sans: "Inter,sans-serif",
    },
  },
})

export default theme
