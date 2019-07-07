import React, { Component } from "react"
import Header from "./Components/Header"
import Sidebar from "./Components/Sidebar"
import Main from "./Components/Main"

import { ThemeProvider } from "styled-components"
// import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import store from "./store"

const theme = {
  green: "#6FC99C",
  darkGreen: "#55AB80",
  hoverGreen: "rgba(85, 171, 128, 0.15)",
  black: " #373737",
  gray: " #F2F2F2",
  darkGray: "#E9E9E9",
  white: "#fff",
  textBlack: "#383D3E",
  textBlack200: "#505050",
  textBlack300: "#31393C"
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
       
            <Header />
            <Sidebar />
            <Main />
           
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
