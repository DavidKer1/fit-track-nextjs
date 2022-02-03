import { createTheme } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "rgba(24,34,119)",
      secondary: "$pink300",
    },
    space: {},
    fonts: {},
  },
})

export default theme
