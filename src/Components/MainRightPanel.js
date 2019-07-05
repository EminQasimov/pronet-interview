import React, { useState } from "react"
import styled from "styled-components"
import { Row } from "antd"
import Categories from "./Categories"
import ProductList from "./ProductList"
import ProductInfo from "./ProductInfo"

const DateRange = styled.h2`
  font-size: 16px;
  padding: 0 8px;
  margin-bottom: 20px;
  border-color: ${({ theme }) => theme.textBlack200};
`

export default function MainRightPanel() {
  const [data, setData] = useState(null)

  return (
    <Row gutter={16}>
      <DateRange>08 - 18 Sentyabr 2018</DateRange>
      <Categories />
      <ProductList productDataSend={data => setData(data)} />
      <ProductInfo product={data} />
    </Row>
  )
}
