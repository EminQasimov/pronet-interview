import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Col, Icon, Empty, Input } from "antd"
import { connect } from "react-redux"
import shortid from "shortid"
import {
  Transition,
  CSSTransition,
  TransitionGroup
} from "react-transition-group"

import AddButton from "./AddButton"
import { ReactComponent as Delete } from "../assets/img/delete.svg"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"

import {
  deleteProduct,
  deleteProductFromCategory,
  addProduct,
  addProductToCategory
} from "../store/actions"

const Products = props => {
  const {
    productList,
    products,
    productDataSend,
    deleteProduct,
    addProduct,
    activeCategory
  } = props

  if (productList.length === 0) {
    productDataSend(null)
  }
  const [showAdd, setShowAdd] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Col span={8}>
      <AddButton title="Məhsullar" onClick={() => setShowAdd(!showAdd)} />
      <Transition in={showAdd} timeout={300}>
        {state => (
          <AddProduct state={state}>
            <Input
              size="large"
              style={{ height: 44 }}
              placeholder="Məhsulun adı"
              value={value}
              onChange={e => {
                setValue(e.target.value)
              }}
            />
            <Button
              style={{ fontWeight: 500 }}
              onClick={() => {
                if (value.trim()) {
                  addProduct(value)
                  setValue("")
                }
              }}
            >
              Əlavə et
            </Button>
            <Button
              style={{ color: "gray" }}
              onClick={() => setShowAdd(!showAdd)}
            >
              İmtina
            </Button>
          </AddProduct>
        )}
      </Transition>
      <ProductList>
        {productList.length === 0 && <StyledEmpty description="List Boşdur" />}
        <TransitionGroup style={{ overflow: "hidden", borderRadius: 4 }}>
          {productList.map(item => {
            return (
              <CSSTransition key={item} timeout={300} classNames="item">
                <ListItem
                  key={shortid.generate()}
                  onClick={() => {
                    productDataSend(
                      products.find(product => product.name === item)
                    )
                  }}
                >
                  <P>{item}</P>
                  <span
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    <Icon component={Pencil} />
                  </span>
                  <span
                    onClick={e => {
                      deleteProduct(item, activeCategory)
                      e.stopPropagation()
                    }}
                  >
                    <Icon component={Delete} />
                  </span>
                </ListItem>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ProductList>
    </Col>
  )
}

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const mapStateToProp = ({ categories, products }) => {
  //dont mutate active path array
  const activeCategory = categories.activePath[categories.activePath.length - 1]

  return {
    products,
    activeCategory,
    productList: has(categories[activeCategory], "products")
      ? categories[activeCategory]["products"]
      : []
  }
}

const mapDispatch = dispatch => {
  return {
    deleteProduct: (name, path) => {
      dispatch(deleteProductFromCategory(name, path))
      dispatch(deleteProduct(name))
    },
    addProduct: name => {
      dispatch(addProduct(name))
      dispatch(addProductToCategory(name))
    }
  }
}

export default connect(
  mapStateToProp,
  mapDispatch
)(Products)

// ____________STYLES__________________
const anim = keyframes`
  from{
    transform-origin: center top;
    transform: translateY(20px);
  }
  to{
    transform-origin: center top;
    transform: translateY(0px);
  }
`
const AddProduct = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 4px;
  overflow: hidden;
  transition: 0.3s ease;
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  height: ${({ state }) =>
    state === "entering" || state === "entered" ? "108px" : "0"};
  margin: ${({ state }) =>
    state === "entering" || state === "entered" ? "6px 0" : "0"};
  padding: ${({ state }) =>
    state === "entering" || state === "entered" ? "16px 20px" : "0px 20px"};
`
const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  padding: 16px 0;
  margin-right: 16px;
  transition: transform .3s ease;
  color: ${({ theme }) => theme.darkGreen};
  &:hover{
    cursor: pointer;
    transform: scale(1.05)
  }
  &:focus{
    outline: none;
  }
`
const ProductList = styled.ul`
  margin-top: 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.textBlack};
  padding: 0;
  position: relative;
`

const ListItem = styled.li`
  border-bottom: 1px solid #e8e8e8;
  height: 54px;
  padding: 0 15px;
  background: ${({ theme }) => theme.white};
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    margin: 0;
    white-space: nowrap;
    font-weight: 500;
  }

  span {
    margin: 8px;
    font-size: 18px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
      * {
        fill: ${({ theme }) => theme.green};
      }
    }
  }

  &:hover {
    cursor: alias;
    background: ${({ theme }) => theme.hoverGreen};
    span {
      transform: scale(1.14);
      opacity: 1;
    }
  }
`
const P = styled.p`
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
`

const StyledEmpty = styled(Empty)`
  animation: ${anim} 0.5s ease-in forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 398px;
  margin: 0 !important;
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.white};
`
