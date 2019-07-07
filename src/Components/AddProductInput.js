import React, { useState, useRef } from "react"
import AddButton from "./AddButton"
import styled from "styled-components"
import { Input } from "antd"

import { Transition } from "react-transition-group"

const AddProduct = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.white};
  border-radius: 4px;
  overflow: hidden;
  transition: 0.3s ease;
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  height: ${({ state }) =>
    state === "entering" || state === "entered" ? "108px" : "0"};
  margin: ${({ state }) =>
    state === "entering" || state === "entered" ? "6px 0" : "0"};
  padding: ${({ state }) =>
    state === "entering" || state === "entered" ? "16px 20px" : "0px 20px"};
`
const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  padding: 0;
  margin-right: 16px;
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.darkGreen};
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`

export default function AddProductInput({ submitHandler }) {
  const [showAdd, setShowAdd] = useState(false)
  const [value, setValue] = useState("")

  const addInput = useRef(null)
  return (
    <>
      <AddButton
        title="Məhsullar"
        onClick={() => {
          setShowAdd(!showAdd)
          !showAdd && addInput.current.focus()
        }}
      />
      <Transition in={showAdd} timeout={300}>
        {state => (
          <AddProduct
            state={state}
            onSubmit={e => {
              e.preventDefault()
              let val = value.trim()
              if (val) {
                if (submitHandler(val)) {
                  setValue("")
                  showAdd && addInput.current.focus()
                }
              }
            }}
          >
            <Input
              size="large"
              ref={addInput}
              placeholder="Məhsulun adı"
              value={value}
              style={{ height: 44 }}
              onChange={e => {
                setValue(e.target.value)
              }}
            />

            <p style={{ margin: 0, paddingTop: 10 }}>
              <Button
                style={{ fontWeight: 500 }}
                onClick={() => {
                  let val = value.trim()
                  if (val) {
                    submitHandler(val)
                    setValue("")
                    showAdd && addInput.current.focus()
                  }
                }}
              >
                Əlavə et
              </Button>
              <Button
                style={{ color: "gray" }}
                onClick={() => setShowAdd(!showAdd)}
              >
                İmtina
              </Button>
            </p>
          </AddProduct>
        )}
      </Transition>
    </>
  )
}
