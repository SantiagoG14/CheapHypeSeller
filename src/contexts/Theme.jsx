import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    dark: "#000000",
    primary: "#FF2F2F",
  },
}

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
