import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Transition } from "react-transition-group"
import { Row, Col, Select, Form, Input, Button, Checkbox, Icon } from "antd"
import { connect } from "react-redux"
import { addCategory } from "../store/actions"
import { ReactComponent as Close } from "../assets/img/close.svg"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
import { ReactComponent as CirclePlus } from "../assets/img/circlePlus.svg"
import { ReactComponent as CircleMinus } from "../assets/img/circleMinus.svg"

const { Option } = Select
const { Item } = Form

const DrawerContent = ({ closeDrawer, addCategory }) => {
  const [inputs, setInputs] = useState(["CPU", "HDD"])

  const [categoryInputs, setCategoryInputs] = useState({
    qrup: "",
    altqrup: ""
  })
  const [parametr, setParametr] = useState("")

  function categoryInputHandler(e) {
    let obj = { ...categoryInputs }
    obj[e.target.name] = e.target.value
    setCategoryInputs(obj)
    console.log(categoryInputs)
  }

  function inputChangeHandler(e) {
    let arr = [...inputs]
    arr[e.target.name] = e.target.value
    setInputs(arr)
    console.log(inputs)
  }
  function removeParamtr(val) {
    let arr = [...inputs].filter((_, idx) => idx !== val)
    setInputs(arr)
  }
  function addNewParamter(val) {
    const str = val.trim()
    const idx = inputs.indexOf(str)
    //no same parametr
    if (str && idx < 0) {
      let arr = [...inputs]
      arr.push(val)
      setInputs(arr)
      setParametr("")
    }
  }
  return (
    <>
      <Heading type="flex" justify="space-between" align="middle">
        <Col>
          <h4>Yeni kateqoriya</h4>
        </Col>
        <Col>
          <Close onClick={closeDrawer} />
        </Col>
      </Heading>
      <Form layout="vertical" style={{ marginRight: 21 }}>
        <Item label="Qrup adı" formLayout="vertical">
          <Input
            size="large"
            name="qrup"
            value={categoryInputs.qrup}
            onChange={categoryInputHandler}
          />
        </Item>
        <Item label="Alt qrup" formLayout="vertical">
          <Input
            suffix={<DownArrow />}
            size="large"
            name="altqrup"
            value={categoryInputs.altqrup || ""}
            onChange={categoryInputHandler}
          />
        </Item>
        <Item label="Qrup növü" formLayout="vertical">
          <Select
            size="large"
            suffixIcon={<DownArrow />}
            defaultValue="Mal / Material"
            optionFilterProp="children"
            name="qrupnovu"
          >
            <Option value="Mal / Material">Mal / Material</Option>
            <Option value="Xidmət">Xidmət</Option>
          </Select>
        </Item>
        <Item formLayout="vertical">
          <Checkbox
            defaultChecked
            name="seriya"
            onChange={categoryInputHandler}
          >
            Seriya nömrəsiz
          </Checkbox>
        </Item>

        <Item label="Parametr" formLayout="vertical">
          {inputs.map((item, idx) => {
            return (
              <P key={idx}>
                <Input
                  suffix={<DownArrow />}
                  key={idx}
                  style={{ marginBottom: 8 }}
                  size="large"
                  name={idx}
                  value={item}
                  onChange={inputChangeHandler}
                />
                <InputIcon
                  component={CircleMinus}
                  onClick={() => removeParamtr(idx)}
                />
              </P>
            )
          })}
          <PlusForm>
            <Input
              size="large"
              placeholder="Parametr seçimi"
              suffix={<DownArrow />}
              value={parametr}
              onChange={e => setParametr(e.target.value)}
              onKeyPress={e => {
                if (e.which === 13 || e.keyCode === 13) {
                  addNewParamter(parametr)
                }
              }}
            />
            <InputIcon
              onClick={() => addNewParamter(parametr)}
              component={CirclePlus}
            />
          </PlusForm>
        </Item>
      </Form>

      <Button
        style={{ marginTop: 16 }}
        type="primary"
        size="large"
        onClick={() => {
          addCategory(inputs, categoryInputs)
          closeDrawer()
        }}
      >
        Əlavə et
      </Button>
    </>
  )
}
const mapState = state => {
  return {}
}
const mapDispatch = dispatch => {
  return {
    addCategory: (inputs, categoryInputs) => {
      dispatch(addCategory(inputs, categoryInputs))
    }
  }
}
const ConnectedDrawer = connect(
  mapState,
  mapDispatch
)(DrawerContent)

export default function({ closeDrawer, visible, height }) {
  return (
    <>
      <Transition in={visible} timeout={300}>
        {state => (
          <Backdrop visible={visible} state={state} onClick={closeDrawer} />
        )}
      </Transition>

      <Transition in={visible} timeout={300}>
        {state => (
          <Drawer
            state={state}
            style={{
              height: height ? height + "px" : "120%"
            }}
          >
            <ConnectedDrawer closeDrawer={closeDrawer} />
          </Drawer>
        )}
      </Transition>
    </>
  )
}

const common = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: -40px;
`
const P = styled.div`
  ${common}
  input {
    font-weight: 500;
  }
`
const PlusForm = styled.div`
  ${common}
  input {
    font-weight: 400 !important;
  }
`
const InputIcon = styled(Icon)`
  font-size: 20px;
  padding: 10px;
`
const Drawer = styled.div`
  position: absolute;
  padding: 0 32px;
  left: -50px;
  z-index: 2;
  width: 346px;
  background: ${({ theme }) => theme.darkGray};
  box-shadow: -10px 0 0 10px ${({ theme }) => theme.gray};
  .ant-empty-description {
    font-size: 0px !important;
  }
  transition: ${({ state }) =>
    state === "entering" || state === "entered"
      ? "0.3s ease-out"
      : "0.2s ease-out"};

  transform: translateX(
    ${({ state }) => (state === "entering" || state === "entered" ? 100 : 0)}%
  );

  input {
    border: none !important;
    font-weight: 500;
    color: ${({ theme }) => theme.black} !important;
  }
  label {
    font-size: 12px !important;
    color: #868686 !important;
  }
  .ant-form-item {
    padding: 0 !important;
    margin-bottom: 17px !important;
  }
  .ant-select-selection-selected-value {
    font-weight: 500;

    color: ${({ theme }) => theme.black};
  }
  .ant-select-selection {
    border: none !important;
  }
`

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  transition: 0.3s ease-out;
  z-index: 1;
  display: ${"pointer-events" in document.body.style ? "block" : "none"};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
`

const Heading = styled(Row)`
  height: 88px;
  h4 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    color: ${({ theme }) => theme.textBlack};
  }
  svg {
    &:hover,
    &:hover path {
      cursor: pointer;
      transition: 0.2s;
      fill: ${({ theme }) => theme.textBlack};
    }
    vertical-align: middle;
  }
`
