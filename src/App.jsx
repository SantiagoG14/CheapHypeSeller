import AppContextProvider from "./contexts/AppContext"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import Theme from "./contexts/Theme"
import Nav from "./Nav"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
function App() {
  return (
    <AppContextProvider>
      <Theme>
        <GlobalStyles />
        <AppWrapper>
          <Nav />
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        </AppWrapper>
      </Theme>
    </AppContextProvider>
  )
}

const AppWrapper = styled.div``

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default App
