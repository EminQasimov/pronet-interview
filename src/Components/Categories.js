import React, { useState } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
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
    border: 1px solid transparent !important; // prevent margin collapsing with border
  }
  .ant-collapse-header {
    background: ${({ theme }) => theme.white} !important;
    border-radius: 4px !important;
    line-height: 16px !important;
    height: 40px !important;
    transition: background 0.3s ease-in-out;
    text-transform: capitalize;
    user-select: none;
    .ant-collapse-extra {
      margin-right: -10px !important;
    }
    .ant-collapse-extra i {
      opacity: 0;
      transition: all 0.3s ease-in-out;
      transform: scale(0);

      &:hover {
        opacity: 1 !important;
        transform: scale(0.99) !important;
      }
    }
    &:hover {
      background: ${({ theme }) => theme.hoverGreen} !important;
      .ant-collapse-extra i {
        opacity: 0.5 !important;
        transform: scale(0.99) !important;
      }
    }
  }
  .ant-collapse-content-box {
    padding: 0 !important;
    padding-left: 16px !important;
  }
`

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

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

function Dots() {
  let [show, setShow] = useState(false)

  return (
    <Popover placement="leftTop" content={content} trigger="click">
      <Icon
        type="more"
        size="large"
        style={{
          fontSize: 26,
          marginTop: "-5px",
          opacity: show ? 1 : 0,
          transform: show ? "scale(0.99)" : "scale(0)"
        }}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setShow(show => !show)
          console.log(show)
        }}
      />
    </Popover>
  )
}

//____________CATERGORIES_________________
const Categories = props => {
  function renderSub(key) {
    console.log(key)
    if (key) {
      console.log(props.categories[key])
    }
  }

  function loop(tree) {
    if (tree !== undefined && has(tree, "children")) {
      return (
        <CollapsMenu
          bordered={false}
          accordion={true}
          onChange={renderSub}
          expandIcon={({ isActive }) => {
            return isActive ? (
              <Icon component={UpArrow} />
            ) : (
              <Icon component={DownArrow} />
            )
          }}
          // defaultActiveKey={["computer"]}
        >
          {tree.children &&
            tree.children.map(key => {
              return (
                <Panel
                  header={key}
                  showArrow={
                    has(props.categories[key], "children") ? true : false
                  }
                  disabled={
                    has(props.categories[key], "children") ? false : true
                  }
                  key={key}
                  extra={<Dots />}
                >
                  {loop(props.categories[key])}
                </Panel>
              )
            })}
        </CollapsMenu>
      )
    } else {
      return
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
export default connect(mapStateToProps)(Categories)
