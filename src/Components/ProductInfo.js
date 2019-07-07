import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Col, Empty, Input, Icon, Button } from "antd"
import shortid from "shortid"
import { Scrollbars } from "react-custom-scrollbars"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"
import { setProductEdit, submitEditProduct } from "../store/actions"

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const ProductInfo = ({ product, editProduct, close, submit }) => {
  let { name, ...rest } = product
  let [data, setData] = useState({})

  function handleChange(e, key) {
    setData({
      ...data,
      [key]: e.target.value
    })
  }

  return (
    <Col span={8} style={{ paddingBottom: 0 }}>
      <Wrapper style={{ height: "645px" }}>
        <Title>
          <span>{name}</span>
          {editProduct && name.trim() ? (
            <Icon style={{ margin: 8 }} component={Pencil} />
          ) : null}
        </Title>
        {Object.keys(rest).length === 0 && <StyledEmpty description=" " />}
        <div
          style={{
            overflow: "hidden",
            height: editProduct ? "470px" : "500px"
          }}
        >
          <Scrollbars
            style={{ padding: 12, height: "100%" }}
            renderTrackVertical={props => (
              <div
                {...props}
                className="track-vertical"
                style={{ background: editProduct ? "#f2f2f2" : "#fff" }}
              />
            )}
          >
            <List>
              {Object.keys(rest).map(key => {
                if (editProduct) {
                  return (
                    <Item key={key}>
                      <Label>{key}</Label>
                      <Value>
                        <Input
                          size="large"
                          style={{ margin: " 10px 0", color: "#373737" }}
                          value={has(data, key) ? data[key] : product[key]}
                          onChange={e => handleChange(e, key)}
                        />
                      </Value>
                    </Item>
                  )
                } else {
                  return (
                    <Item key={key}>
                      <Label>{key}</Label>
                      <Value key={shortid.generate()}>
                        {product[key] ? product[key] : " - "}
                      </Value>
                    </Item>
                  )
                }
              })}
            </List>
          </Scrollbars>
        </div>
        {editProduct && (
          <p style={{ padding: "10px", paddingTop: "30px" }}>
            <EditButton
              size="large"
              onClick={() => {
                submit({ ...rest, ...data, name })
                close()
                setData({})
              }}
            >
              Redaktə et
            </EditButton>
            <RejectButton size="large" onClick={() => close()}>
              İmtina
            </RejectButton>
          </p>
        )}
      </Wrapper>
    </Col>
  )
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
    },
    submit: data => {
      dispatch(submitEditProduct(data))
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
