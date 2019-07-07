import React from "react"
import styled from "styled-components"
import { Transition } from "react-transition-group"
import { Row, Col, Select, Form, Input,Button, Checkbox } from "antd"
import { ReactComponent as Close } from "../assets/img/close.svg"
import { ReactComponent as DownArrow } from "../assets/img/blackArrow.svg"
const { Option } = Select

export default function({ closeDrawer, visible, height }) {
  const DrawerContent = props => {
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
        <Form layout="vertical" style={{ marginRight: 16 }}>
          <Form.Item label="Qrup adı" formLayout="vertical">
            <Input defaultValue="Avadanliq" size="large" />
          </Form.Item>
          <Form.Item label="Alt qrup" formLayout="vertical">
            <Select
              suffixIcon={<DownArrow />}
              showSearch
              size="large"
              defaultValue="Məişət texnikası"
              optionFilterProp="children"
              //   onChange={onChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Qrup növü" formLayout="vertical">
            <Select
              showSearch
              size="large"
              suffixIcon={<DownArrow />}
              defaultValue="Mal / Material"
              optionFilterProp="children"
              //   onChange={onChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
            >
              <Option value="Mal / Material">Mal / Material</Option>
              <Option value="Xidmət">Xidmət</Option>
            </Select>
          </Form.Item>
          <Form.Item formLayout="vertical">
            <Checkbox defaultChecked>Seriya nömrəsiz</Checkbox>
          </Form.Item>
          <Form.Item label="Parametr" formLayout="vertical">
            <Select
              suffixIcon={<DownArrow />}
              showSearch
              style={{ marginBottom: 8 }}
              size="large"
              defaultValue="CPU"
              optionFilterProp="children"
              //   onChange={onChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
            >
              <Option value="Mal / Material">Mal / Material</Option>
              <Option value="Xidmət">Xidmət</Option>
            </Select>
            <Select
              suffixIcon={<DownArrow />}
              style={{ marginBottom: 8 }}
              showSearch
              size="large"
              defaultValue="HDD"
              optionFilterProp="children"
              //   onChange={onChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
            >
              <Option value="Mal / Material">Mal / Material</Option>
              <Option value="Xidmət">Xidmət</Option>
            </Select>
            <Select
              showSearch
              style={{ marginBottom: 8 }}
              size="large"
              notFoundContent=" "
              placeholder="Parametr seçimi"
              optionFilterProp="children"
              suffixIcon={<DownArrow />}
              //   onChange={onChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
              //   onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
            />
          </Form.Item>
        </Form>
        <Button type="primary" size="large">
        Əlavə et
          </Button>
      </>
    )
  }

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
            <DrawerContent />
          </Drawer>
        )}
      </Transition>
    </>
  )
}

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
