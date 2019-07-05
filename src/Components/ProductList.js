import React from "react"
import styled from "styled-components"
import { Col, Icon, List } from "antd"
import { connect } from "react-redux"

import AddButton from "./AddButton"
import { ReactComponent as Delete } from "../assets/img/delete.svg"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"

const ProductList = styled(List)`
  margin-top: 6px !important;
  border-radius: 4px !important;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.textBlack} !important;

  .ant-list-item {
    border-bottom: 1px solid #e8e8e8;
    height: 54px;
    padding: 0 15px;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;

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
        transform: scale(0.9);
        opacity: 1;
      }
    }
  }
`
const P = styled.p`
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
`
const Products = ({ productList, products, productDataSend }) => {
  if (productList.length === 0) {
    productDataSend(null)
  }
  return (
    <Col span={8}>
      <AddButton title="Məhsullar" />
      <ProductList
        bordered={false}
        dataSource={productList}
        renderItem={item => (
          <List.Item
            onClick={e => {
              productDataSend(products.find(product => product.name === item))
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
                e.stopPropagation()
              }}
            >
              <Icon component={Delete} />
            </span>
          </List.Item>
        )}
      />
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
    productList: has(categories[activeCategory], "products")
      ? categories[activeCategory]["products"]
      : []
  }
}

export default connect(mapStateToProp)(Products)
