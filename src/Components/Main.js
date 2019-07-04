import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Row } from "antd"
import MainLeftPanel from "./MainLeftPanel"
import MainRightPanel from "./MainRightPanel"

const Main = styled.main`
    width: calc(100% - 96px);
    height: calc(100vh - 80px);
    background: ${({ theme }) => theme.gray}
    color: ${({ theme }) => theme.textBlack}
    position: fixed;
    right: 0;
    top: 80px;
    display: flex;
    overflow: auto; 
    overflow-x: hidden; 
`


// don't show scrollbar in large height screens
function useResize(main) {
  const [height, setHeight] = useState(null)
  
  useEffect(() => {
    function resize() {
      let el = main.current,
        height
      el.offsetHeight < 800
        ? (height = el.scrollHeight)
        : (height = el.offsetHeight)

      setHeight(height)
    }
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [main])

  return height
}

export default function() {
  const main = useRef(null)
  const height = useResize(main)

  return (
    <Main ref={main}>
      <MainLeftPanel height={height} />
      <Row style={{ flex: 1, padding: "24px 32px" }}>
        <MainRightPanel />
      </Row>
    </Main>
  )
}
