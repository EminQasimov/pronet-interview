import React from "react"
import styled  from "styled-components"
import { Col, Icon, List } from "antd"

import AddButton from "./AddButton"
import { ReactComponent as Delete } from "../assets/img/delete.svg"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"

const data = [
  "Fujitsu A5R35-D",
  "Fujitsu E5R85-Z",
  "Fujitsu C5A32-C",
  "Fujitsu A5R35-D",
  "Fujitsu A5R35-D",
  "Fujitsu A5G35-A",
  "Fujitsu A5R35-C",
  "Fujitsu B4R35-O", 
]

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
       *{
        fill: ${({ theme }) => theme.green};
       }
      }
    }
    &:hover {
      cursor: default;
      background: ${({ theme }) => theme.hoverGreen};
      span {
        transform: scale(.9);
        opacity: 1;
      }
    }
  }
`
export default function Products() {
  return (
    <Col span={8}>
      <AddButton title="Məhsullar"/>
      <ProductList
        bordered={false}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <p>{item}</p>
            <span>
              <Icon component={Pencil} />
            </span>
            <span>
              <Icon component={Delete} />
            </span>
          </List.Item>
        )}
      />
    </Col>
  )
}
