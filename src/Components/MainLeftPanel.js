import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Row, Col, Button, Input, Collapse, Icon } from "antd"
import { ReactComponent as Setting } from "../assets/img/setting.svg"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
import Drawer from "./Drawer"

const { Search } = Input
const { Panel } = Collapse

export default function MainLeftPanel({ height }) {
  const [visible, setVisible] = useState(false)

  function showDrawer() {
    setVisible(true)
  }

  function closeDrawer() {
    setVisible(false)
  }

  return (
    <>
      <Drawer height={height} visible={visible} closeDrawer={closeDrawer} />
      <LeftPanel style={{ height: height ? height + "px" : "120%" }}>
        <Heading type="flex" justify="space-between" align="middle">
          <Col>
            <h4>Məhsullar jurnalı</h4>
          </Col>
          <Col>
            <Setting />
          </Col>
        </Heading>

        <YeniKateqoriya type="flex" align="middle">
          <Button type="primary" size="large" onClick={showDrawer}>
            Yeni Kateqoriya
          </Button>
        </YeniKateqoriya>

        <SearchInput type="flex" align="middle">
          <label htmlFor="searchinput">
            Axtarış
            <Search
              size="large"
              placeholder="Məhsulun adı"
              onSearch={value => console.log(value)}
              id="searchinput"
            />
          </label>
        </SearchInput>

        <CollapsMenu
          expandIconPosition="right"
          bordered={false}
          accordion
          expandIcon={() => <Icon component={DownArrow} />}
        >
          <Panel header="Kateqoriya üzrə" key="1">
            asdad
          </Panel>
          <Panel header="Model seçimi" key="2">
            asdasd
          </Panel>
          <Panel header="Məhsul tipi" key="3">
            Sdasd
          </Panel>
        </CollapsMenu>

        <Filter>
          <p>Seçim üzrə filtrasiya</p>
          <Button type="primary" size="large">
            Ümumi
          </Button>
          <p>Mal / Material</p>
          <p>Xidmət</p>
        </Filter>
      </LeftPanel>
    </>
  )
}

const ThemeOverrides = css`
  .ant-btn-primary {
    background: ${({ theme }) => theme.darkGreen};
    border-color: ${({ theme }) => theme.darkGreen};
  }
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    cursor: pointer;
    background-color: ${({ theme }) => theme.darkGreen};
    border-color: ${({ theme }) => theme.darkGreen};
  }
`

const LeftPanel = styled(Row)`
  width: 296px;
  position: absolute;
  left: 0;
  z-index: 3;
  border-right: 2px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.darkGray};
`

const Heading = styled(Row)`
  height: 88px;
  padding: 0 32px;
  border-bottom: 2px solid ${({ theme }) => theme.gray};
  h4 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    color: ${({ theme }) => theme.textBlack};
  }
  svg {
    vertical-align: middle;
  }
`
const YeniKateqoriya = styled(Row)`
  height: 92px;
  padding: 0 32px;
  border-bottom: 2px solid ${({ theme }) => theme.gray};
  ${ThemeOverrides}
`
const SearchInput = styled(Row)`
  height: 120px;
  padding: 0 32px;
  border-bottom: 2px solid ${({ theme }) => theme.gray};
  label {
    font-size: 14px;
    color: ${({ theme }) => theme.textBlack200};
    font-weight: 500;
  }
  .ant-input-suffix {
    transform: translateY(-10%) !important;
  }
  input {
    height: 44px;
    font-size: 14px;
    border-radius: 3px;
    margin-top: 10px;
    border: none;
  }
`
const CollapsMenu = styled(Collapse)`
  background: transparent !important;
  .ant-collapse-header {
    font-size: 16px !important;
    font-weight: bold !important;
    padding: 20px 0px !important;
    padding-right: 40px !important;
    border: none !important;
    color: ${({ theme }) => theme.textBlack200} !important;
  }

  .ant-collapse-item {
    padding: 0px 32px !important;
    border-bottom: 2px solid ${({ theme }) => theme.gray} !important;
    i {
      right: 0 !important;
    }
  }
`
const Filter = styled.div`
  padding: 24px 32px;
  p {
    margin: 0;
    color: ${({ theme }) => theme.textBlack200};
  }
  button {
    margin: 16px 0;
  }
  ${ThemeOverrides}
`
