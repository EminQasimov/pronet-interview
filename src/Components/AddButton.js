import React from "react"

import styled from "styled-components"
import { Button, Icon } from "antd"

const AddButton = styled(Button)`
  background: ${({ theme }) => theme.darkGreen} !important;
  border-color: ${({ theme }) => theme.darkGreen} !important;
  text-align: left !important;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${({ theme }) => theme.darkGreen} !important;
    border-color: ${({ theme }) => theme.darkGreen} !important;
  }
  display: flex !important;
  align-itens: center;
  justify-content: space-between;
  font-size: 12px !important;
  span {
    display: block;
  }
`

export default function({ title }) {
  return (
    <AddButton type="primary" size="large" block>
      <span> {title}</span>
      <span>
        <Icon type="plus" style={{ fontSize: 18 }} />
      </span>
    </AddButton>
  )
}
