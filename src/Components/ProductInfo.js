import React from "react"
import { Col } from "antd"
import styled from "styled-components"

export default function ProductInfo({ product = { name: "Fujustsi" } }) {
  let items = []
  let { name, ...rest } = product

  Object.keys(rest).forEach((key, i) => {
    items.push(
      <Item key={i}>
        <Label>{key}</Label>
        <Value>{product[key]}</Value>
      </Item>
    )
  })

  return (
    <Col span={8}>
      <Wrapper>
        <Title>{name}</Title>
        {items}
      </Wrapper>
    </Col>
  )
}


const Wrapper = styled("div")`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.textBlack};
  border-radius: 4px;
  padding: 24px;
`
const Title = styled.h2`
  margin-bottom: 22px;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.textBlack300};
  font-weight: bold;
`
const Item = styled.div`
  margin-bottom: 10px;
`
const Label = styled.p`
  font-size: 10px;
  opacity: 0.5;
  margin-bottom: 0px;
`
const Value = styled.div`
  font-size: 14px;
  &:first-letter{
    text-transform: capitalize
  }
`