import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Col, Empty } from "antd"
import shortid from "shortid"

const ProductInfo = ({ defaultProduct, product }) => {
  let productObj
  if (product) {
    productObj = product
  } else {
    productObj = defaultProduct
  }
  let { name, ...rest } = productObj

  useEffect(() => {
    console.log("product info rendered again")
  })

  return (
    <Col span={8}>
      <Wrapper>
        <Title>{name}</Title>
        {Object.keys(rest).length === 0 && (
          <StyledEmpty description="List Boşdur" />
        )}
        <List>
          {Object.keys(rest).map(key => {
            return (
              <Item key={key}>
                <Label>{key}</Label>
                <Value key={shortid.generate()}>{productObj[key]}</Value>
              </Item>
            )
          })}
        </List>
      </Wrapper>
    </Col>
  )
}

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

// get info of the first product of active Category from the last element of activePath array
const mapStateToProp = ({ categories, products }) => {
  const activeCategory = categories.activePath[categories.activePath.length - 1]
  let product
  if (has(categories[activeCategory], "products")) {
    product = products.find(el => {
      return el["name"] === categories[activeCategory]["products"][0]
    })
  }
  return {
    defaultProduct: product || { name: "" }
  }
}

export default connect(mapStateToProp)(ProductInfo)

const anim = keyframes`
  from{
    opacity: 0;
    transform-origin: center bottom;
    transform: translateY(20px);
  }
  to{
    opacity: 1;
    transform-origin: center bottom;
    transform: translateY(0px);
  }
`
 
const StyledEmpty = styled(Empty)`
  animation: ${anim} 0.5s ease-in forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 360px;
  margin: 0 !important;
  width: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.white};
`

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
const List = styled.ul`
  padding: 0;
`
const Item = styled.li`
  margin-bottom: 10px;
  overflow: hidden;
`
const Label = styled.p`
  font-size: 10px;
  opacity: 0.5;
  margin-bottom: 0px;
`
const Value = styled.div`
  font-size: 14px;
  &:first-letter {
    text-transform: capitalize;
  }
  color: ${({ theme }) => theme.textBlack300};
  animation: ${anim} 0.2s ease-in-out forwards;
`
