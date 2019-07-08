import React, { useState, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import useOnClickOutside from "../hooks/useOnClickOutside"
import { Col, Collapse, Icon, Input } from "antd"
import AddButton from "./AddButton"
import PopAndDots from "./PopAndDots"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
import { ReactComponent as UpArrow } from "../assets/img/upArrow.svg"

import {
  changePath,
  changeCategoryName,
  editCategoryName,
  setWhereAddSubCategory,
  addSubCategory
} from "../store/actions"

const { Panel } = Collapse

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const Categories = props => {
  const {
    categories,
    changePath,
    changeCategoryName,
    editCategoryName,
    setWhereAddSubCategory,
    addSubCategory,
    showDrawer
  } = props

  const [categoryName, setCategoryName] = useState(null)
  const [subCategoryName, setSubCategoryName] = useState(null)
  const ref = useRef(null)
  const addSubRef = useRef(null)

  function handleInputChange(e) {
    setCategoryName(e.target.value)
  }
  function handleSubCategoryNameChange(e) {
    setSubCategoryName(e.target.value)
  }
  const path = [...categories.activePath].pop()
  function renderSub(_, key) {
    if (has(categories[key], "products")) {
      let activeLast = path
      if (activeLast !== key) {
        changePath(key)
      }
    } else {
      changePath(key)
    }
    if (_) {
      console.log(key, "is opened")
    } else {
      console.log(key, "is closed")
    }
  }

  useOnClickOutside(ref, () => {
    editCategoryName()
  })

  useOnClickOutside(addSubRef, () => {
    console.log("i remoce cat from store")
    setWhereAddSubCategory()
  })

  function loop(tree) {
    if (tree !== undefined && has(tree, "children") && tree.children) {
      return tree.children.map(key => {
        let target = categories[key]
        let rendered = (
          <CollapsMenu
            bordered={false}
            onChange={_ => renderSub(_, key)}
            key={key}
            expandIcon={({ isActive }) => {
              return isActive ? (
                <Icon component={UpArrow} />
              ) : (
                <Icon component={DownArrow} />
              )
            }}
            // defaultActiveKey={
            //   categories.activePath.indexOf(key) >= 0 ? key : ""
            // }
            activeKey={categories.activePath.indexOf(key) >= 0 ? key : ""}
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
                      style={{ textIndent: 20 }}
                      size="large"
                      placeholder="Kateqoriyanın yeni adı"
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
                    // onDoubleClick={e => {
                    //   e.stopPropagation()
                    //   editCategoryName(key)
                    // }}
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
              className={
                path === key && has(categories[path], "products")
                  ? "activeCat"
                  : null
              }
              key={key}
            >
              {categories.whereAddSubcategory === key ? (
                <Form
                  key={key}
                  ref={addSubRef}
                  onSubmit={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (
                      subCategoryName.trim() &&
                      !has(categories, subCategoryName.trim())
                    ) {
                      addSubCategory(subCategoryName)
                      setWhereAddSubCategory()
                      setSubCategoryName("")
                    }
                  }}
                >
                  <EditCategoryInput
                    radius="4px"
                    autoFocus
                    size="large"
                    placeholder="Alt kateqoriyanın adı"
                    value={subCategoryName}
                    onFocus={e => e.stopPropagation()}
                    onClick={e => e.stopPropagation()}
                    onKeyDown={e => e.stopPropagation()}
                    onKeyPress={e => e.stopPropagation()}
                    onChange={handleSubCategoryNameChange}
                  />
                </Form>
              ) : (
                loop(target)
              )}
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
      <AddButton title="Kategoriyalar" onClick={showDrawer} />
      {loop(categories)}
    </Col>
  )
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePath: path => {
      dispatch(changePath(path))
    },
    changeCategoryName: newName => {
      dispatch(changeCategoryName(newName))
    },
    editCategoryName: (name = "") => {
      dispatch(editCategoryName(name))
    },
    setWhereAddSubCategory: () => {
      dispatch(setWhereAddSubCategory(""))
    },
    addSubCategory: name => {
      dispatch(addSubCategory(name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

const anim = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`
const Form = styled.form`
  margin: 4px 1px;
  padding-left: 25px;
  animation: ${anim} 0.5s ease-in forwards;
`
const EditCategoryInput = styled(Input)`
  border: none !important;
  width: 100% !important;
  height: 100%;

  border-radius: ${props => (props.radius ? props.radius : 0)} !important;
  text-indent: 4px;
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
