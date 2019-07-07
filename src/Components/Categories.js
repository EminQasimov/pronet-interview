import React, { useState, useRef } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import useOnClickOutside from "../hooks/useOnClickOutside"

import {
  changePath,
  changeCategoryName,
  editCategoryName
} from "../store/actions"
import { Col, Collapse, Icon, Input } from "antd"
import AddButton from "./AddButton"
import PopAndDots from "./PopAndDots"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
import { ReactComponent as UpArrow } from "../assets/img/upArrow.svg"

const { Panel } = Collapse

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const Categories = ({
  categories,
  activePath,
  change,
  changeCategoryName,
  editCategoryName
}) => {
  const [categoryName, setCategoryName] = useState(null)
  const ref = useRef()

  function handleInputChange(e) {
    setCategoryName(e.target.value)
  }
  const path = activePath[activePath.length - 1]
  function renderSub(_, key) {
    if (has(categories[key], "products")) {
      let activeLast = path
      if (activeLast !== key) {
        change([key])
      }
    }
    if (_) {
      console.log(key, "is opened")
    } else {
      console.log(key, "is closed")
    }
  }

  useOnClickOutside(ref, () => {
    console.log("exited")
    editCategoryName()
  })

  function loop(tree) {
    if (tree !== undefined && has(tree, "children") && tree.children) {
      return tree.children.map(key => {
        let target = categories[key]
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
              categories.activePath.find(cat => cat === key) ? key : ""
            }
          >
            <Panel
              header={
                categories.editCategory === key ? (
                  <form
                    ref={ref}
                    style={{ width: "calc(100% + 44px)", margin: " 0 -24px " }}
                    onSubmit={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      if (categoryName.trim()) {
                        changeCategoryName(categoryName)
                        editCategoryName()
                        setCategoryName("")
                      }
                    }}
                  >
                    <EditCategoryInput
                      autoFocus
                      size="large"
                      placeholder="Alt kateqoriyanın adı"
                      value={categoryName}
                      onFocus={e => e.stopPropagation()}
                      onClick={e => e.stopPropagation()}
                      onKeyDown={e => e.stopPropagation()}
                      onKeyPress={e => e.stopPropagation()}
                      onChange={handleInputChange}
                    />
                  </form>
                ) : (
                  <p
                    onDoubleClick={e => {
                      e.stopPropagation()
                      editCategoryName(key)
                    }}
                    style={{ width: "100%", padding: "10px", paddingLeft: 0 }}
                  >
                    {key}
                  </p>
                )
              }
              showArrow={
                has(target, "children") && categories.editCategory !== key
                  ? true
                  : false
              }
              extra={
                categories.editCategory === key ? null : (
                  <PopAndDots
                    cat={key}
                    plus={has(target, "children") ? true : false}
                  />
                )
              }
              className={path === key ? "activeCat" : null}
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

      {loop(categories)}
    </Col>
  )
}

const mapStateToProps = ({ categories }) => {
  return { categories, activePath: categories.activePath }
}
const mapDispatchToProps = dispatch => {
  return {
    change: path => {
      dispatch(changePath(path))
    },
    changeCategoryName: newName => {
      dispatch(changeCategoryName(newName))
    },
    editCategoryName: (name = "") => {
      dispatch(editCategoryName(name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

const EditCategoryInput = styled(Input)`
  border: none !important;
  width: 100% !important;
  height: 100%;

  border-radius: 0 !important;
  text-indent: 16px;
  &:focus,
  &:hover {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`

const CollapsMenu = styled(Collapse)`
  background-color: transparent !important;

  .ant-collapse-item {
    margin: 4px 0 !important;
    border: 1px solid transparent !important;
  }
  .ant-collapse-header {
    background: ${({ theme }) => theme.white};
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
      background: ${({ theme }) => theme.hoverGreen};
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
