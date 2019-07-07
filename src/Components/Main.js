import React, { useRef } from "react"
import styled from "styled-components"
import { Row } from "antd"
import MainLeftPanel from "./MainLeftPanel"
import MainRightPanel from "./MainRightPanel"
import useResize from "../hooks/useResize"

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

export default function() {
  const main = useRef(null)
  const height = useResize(main)

  return (
    <Main ref={main}>
      <MainLeftPanel height={height} />
      <Row
        style={{
          flex: 1,
          padding: "24px 32px",
          paddingBottom:0,
          width: " calc(100% - 296px)",
          position: "absolute",
          right: 0
        }}
      >
        <MainRightPanel />
      </Row>
    </Main>
  )
}
