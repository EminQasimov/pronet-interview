import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Col, Empty, Input, Icon, Button } from "antd"
import shortid from "shortid"
import { Scrollbars } from "react-custom-scrollbars"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"
import { setProductEdit } from "../store/actions"

const ProductInfo = ({ product, editProduct, close }) => {
  let { name, ...rest } = product

  useEffect(() => {
    console.log("product info", product)
  })

  return (
    <Col span={8}>
      <Wrapper>
        <Title>
          <span>{name}</span>
          {editProduct && <Icon style={{ margin: 8 }} component={Pencil} />}
        </Title>
        {Object.keys(rest).length === 0 && <StyledEmpty description=" " />}
        <div style={{ overflow: "hidden", height: 490 }}>
          <Scrollbars style={{ padding: 12, height: "100%" }}>
            <List>
              {Object.keys(rest).map(key => {
                if (editProduct) {
                  return (
                    <Item key={key}>
                      <Label>{key}</Label>
                      <Value key={shortid.generate()}>
                        <Input
                          size="large"
                          style={{ margin: " 10px 0", color: "#373737" }}
                          defaultValue={product[key]}
                        />
                      </Value>
                    </Item>
                  )
                } else {
                  return (
                    <Item key={key}>
                      <Label>{key}</Label>
                      <Value key={shortid.generate()}>{product[key]}</Value>
                    </Item>
                  )
                }
              })}
            </List>
          </Scrollbars>
        </div>
        {editProduct && (
          <p style={{ padding: "10px" }}>
            <EditButton size="large">Redaktə et</EditButton>
            <RejectButton size="large" onClick={close}>
              İmtina
            </RejectButton>
          </p>
        )}
      </Wrapper>
    </Col>
  )
}

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const mapCurrentProductToProp = ({ categories, products }) => {
  let product

  if (!categories.activeProduct) {
    //if active product does not exist get it from first active cate.. product
    const activeCat = [...categories.activePath].pop()
    if (
      has(categories[activeCat], "products") &&
      categories[activeCat]["products"][0]
    ) {
      let result = products.find(
        ({ name }) => name === categories[activeCat]["products"][0]
      )
      if (!result) {
        product = { name: " " }
      } else {
        product = result
      }
    } else {
      product = { name: " " }
    }
  } else {
    let result = products.find(({ name }) => {
      return name === categories.activeProduct
    })

    if (!result) {
      product = { name: " " }
    } else {
      product = result
    }
  }

  return {
    product,
    editProduct: categories.editProduct
  }
}
const mapDispatch = dispatch => {
  return {
    close: () => {
      dispatch(setProductEdit(false))
    }
  }
}

export default connect(
  mapCurrentProductToProp,
  mapDispatch
)(ProductInfo)

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
const EditButton = styled(Button)`
  background: ${({ theme }) => theme.darkGreen} !important;
  border-color: ${({ theme }) => theme.darkGreen} !important;
  color: ${({ theme }) => theme.white} !important;
  text-align: left !important;
  margin-right: 10px;
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${({ theme }) => theme.darkGreen} !important;
    border-color: ${({ theme }) => theme.darkGreen} !important;
  }
`
const RejectButton = styled(Button)`
  background: ${({ theme }) => theme.white} !important;
  border: none !important;
  text-align: left !important;
  &:hover,
  &:focus {
    cursor: pointer;
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
  padding: 24px 8px;
  height: 645px;
  overflow: hidden;
`
const Title = styled.h2`
  margin-bottom: 22px;
  font-size: 20px;
  line-height: 24px;
  margin-left: 16px;
  &:first-letter {
    text-transform: uppercase;
  }
  color: ${({ theme }) => theme.textBlack300};
  font-weight: bold;
`
const List = styled.ul`
  padding: 0;
  padding: 12px;
  padding-right: 22px;
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
