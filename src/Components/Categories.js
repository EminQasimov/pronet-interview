import React, { useState, useRef } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { changePath } from "../store/actions"

import useOnClickOutside from "../hooks/useOnClickOutside"
import { Col, Collapse, Icon, Popover } from "antd"
import AddButton from "./AddButton"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
import { ReactComponent as UpArrow } from "../assets/img/upArrow.svg"
import { ReactComponent as Pencil } from "../assets/img/pencil.svg"
import { ReactComponent as Delete } from "../assets/img/delete.svg"

const { Panel } = Collapse

const PopContent = styled.div`
  font-size: 12px;
  padding: 12px 16px;
  user-select: none;
  color: ${({ theme }) => theme.textBlack};
  path {
    fill: ${({ theme }) => theme.textBlack};
  }
  .anticon {
    font-size: 16px;
    padding-right: 4px;
    vertical-align: bottom;
  }
  p,
  p *,
  path {
    transition: all 0.1s ease-in-out;
  }
  p:hover,
  p:hover * {
    cursor: pointer;
    color: ${({ theme }) => theme.darkGreen};
    fill: ${({ theme }) => theme.darkGreen};
  }
`

const CollapsMenu = styled(Collapse)`
  background-color: transparent !important;

  .ant-collapse-item {
    margin: 4px 0 !important;
    border: 1px solid transparent !important;
  }
  .ant-collapse-header {
    background: ${({ theme }) => theme.white} !important;
    border-radius: 4px !important;
    height: 40px !important;
    transition: background 0.3s ease-in-out;
    text-transform: capitalize;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      overflow: hidden;
      margin: 0;
    }
    span {
      transition: all 0.3s ease-in-out;
      display: block;
      margin-right: -10px;
      font-size: 26px;
      width: 10px;
      i.anticon.anticon-more {
        margin-left: -14px;
      }
      &:hover {
        cursor: pointer;
        transform: scale(0.99) !important;
        svg {
          fill: ${({ theme }) => theme.textBlack};
        }
      }
    }

    &:hover {
      background: ${({ theme }) => theme.hoverGreen} !important;
      span {
        opacity: 0.7 !important;
        transform: scale(0.99) !important;
      }
    }
  }
  .ant-collapse-content-box {
    padding: 0 !important;
    padding-left: 16px !important;
  }
`

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const content = (
  <PopContent
    onClick={e => {
      e.preventDefault()
      e.stopPropagation()
    }}
  >
    <p
      onClick={e => {
        console.log("alt clicked")
      }}
    >
      <Icon type="plus" /> Alt kateqoriya
    </p>
    <p
      onClick={e => {
        console.log("alt clicked")
      }}
    >
      <Icon component={Pencil} /> Redaktə et
    </p>
    <p
      style={{ margin: 0 }}
      onClick={e => {
        console.log("alt clicked")
      }}
    >
      <Icon component={Delete} /> Sil
    </p>
  </PopContent>
)

function Dots() {
  const [showDots, setShowDots] = useState(false)
  const ref = useRef()

  useOnClickOutside(ref, () => setShowDots(false))

  return (
    <Popover placement="leftTop" content={content} trigger="click">
      <span
        ref={ref}
        style={{
          opacity: showDots ? 1 : 0,
          transform: showDots ? "scale(0.99)" : "scale(0)"
        }}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setShowDots(showDots => !showDots)
          console.log(showDots)
        }}
      >
        <Icon type="more" size="large" />
      </span>
    </Popover>
  )
}

//____________CATERGORIES_________________
const Categories = props => {
  function renderSub(_, key) {
    if (has(props.categories[key], "products")) {
      let activeLast = [...props.categories.activePath].pop()
      if (activeLast !== key) {
        props.change([key])
      }
    }
    if (_) {
      console.log(key, "is opened")
    } else {
      console.log(key, "is closed")
    }
  }

  function loop(tree) {
    if (tree !== undefined && has(tree, "children") && tree.children) {
      return tree.children.map(key => {
        let target = props.categories[key]
        let rendered = (
          <CollapsMenu
            bordered={false}
            accordion={true}
            onChange={_ => renderSub(_, key)}
            key={key}
            expandIcon={({ isActive }) => {
              return isActive ? (
                <Icon component={UpArrow} />
              ) : (
                <Icon component={DownArrow} />
              )
            }}
            defaultActiveKey={
              props.categories.activePath.find(cat => cat === key) ? key : ""
            }
          >
            <Panel
              header={<p>{key}</p>}
              showArrow={has(target, "children") ? true : false}
              extra={<Dots />}
              key={key}
            >
              {loop(target)}
            </Panel>
          </CollapsMenu>
        )

        return rendered
      })
    } else {
      return null
    }
  }

  return (
    <Col span={8}>
      <AddButton title="Kategoriyalar" />
      {loop(props.categories)}
    </Col>
  )
}

const mapStateToProps = ({ categories }) => {
  return { categories }
}
const mapDispatchToProps = dispatch => {
  return {
    change: path => {
      dispatch(changePath(path))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
