import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { Col, Icon, Empty } from "antd"
import { connect } from "react-redux"
import shortid from "shortid"
import AddProductInput from "./AddProductInput"

import { ReactComponent as Delete } from "../assets/img/delete.svg"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import {
  deleteProduct,
  deleteProductFromCategory,
  addProduct,
  addProductToCategory,
  setCurrentProduct,
  setProductEdit
} from "../store/actions"

const Products = props => {
  const {
    productList,
    deleteProduct,
    addProduct,
    products,
    setCurrentProduct,
    activePath,
    edit,
    activeProduct
  } = props

  function submitHandler(val) {
    if (activePath && !products.find(product => product.name === val)) {
      addProduct(val)
      return true
    }
    return false
  }
  const [time, setTime] = useState(false)
  //delay mount of items for transition
  useEffect(() => {
    setTime(false)
    setTimeout(() => {
      setTime(true)
    }, 100)
  }, [activePath])
  return (
    <Col span={8}>
      <AddProductInput submitHandler={submitHandler} />
      <ProductList>
        {productList.length === 0 && <StyledEmpty description=" " />}
        {time && (
          <TransitionGroup
            className="from-transition"
            style={{ overflow: "hidden", borderRadius: 4 }}
          >
            {productList.map(item => {
              return (
                <CSSTransition
                  key={item}
                  appear={true}
                  unmoutOnExit
                  timeout={300}
                  classNames="trans"
                >
                  <ListItem
                    key={shortid.generate()}
                    className={
                      activeProduct && activeProduct === item
                        ? "active"
                        : !activeProduct && productList[0] === item
                        ? "active"
                        : " "
                    }
                    onClick={e => {
                      e.currentTarget.parentNode.childNodes.forEach(element => {
                        element.classList.remove("active")
                      })
                      e.currentTarget.classList.add("active")
                      setCurrentProduct(item)
                      edit(false)
                    }}
                  >
                    <P>{item}</P>
                    <span
                      onClick={e => {
                        e.stopPropagation()
                        edit(true)
                        setCurrentProduct(item)
                      }}
                    >
                      <Icon component={Pencil} />
                    </span>
                    <span
                      onClick={e => {
                        deleteProduct(item)
                        e.stopPropagation()
                        edit(false)
                      }}
                    >
                      <Icon component={Delete} />
                    </span>
                  </ListItem>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
        )}
      </ProductList>
    </Col>
  )
}

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const mapStateToProp = ({ categories, products }) => {
  //dont mutate active path array
  const activePath = categories.activePath[categories.activePath.length - 1]

  return {
    products,
    activePath,
    activeProduct: categories.activeProduct,
    productList: has(categories[activePath], "products")
      ? categories[activePath]["products"]
      : []
  }
}

const mapDispatch = dispatch => {
  return {
    deleteProduct: name => {
      dispatch(deleteProductFromCategory(name))
      dispatch(deleteProduct(name))
    },
    addProduct: name => {
      dispatch(addProduct(name))
      dispatch(addProductToCategory(name))
    },
    setCurrentProduct: name => {
      dispatch(setCurrentProduct(name))
    },
    edit: mode => {
      dispatch(setProductEdit(mode))
    }
  }
}

export default connect(
  mapStateToProp,
  mapDispatch
)(Products)

// ____________STYLES__________________
const animEmpty = keyframes`
  from{
    transform-origin: center top;
    transform: translateY(20px);
  }
  to{
    transform-origin: center top;
    transform: translateY(0px);
  }
`
const StyledEmpty = styled(Empty)`
  animation: ${animEmpty} 0.5s ease-in forwards;
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

const ProductList = styled.ul`
  margin-top: 6px;
  margin-bottom: 0;
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
  &.active {
    background: ${({ theme }) => theme.hoverGreen};
    span {
      transform: scale(1.14);
      opacity: 1;
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
  text-transform: capitalize;
`
