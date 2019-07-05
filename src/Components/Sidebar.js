import React from "react"
import styled from "styled-components"

import { ReactComponent as Davam } from "../assets/img/1.svg"
import { ReactComponent as Jurnal } from "../assets/img/2.svg"
import { ReactComponent as Dovr } from "../assets/img/3.svg"
import { ReactComponent as Borc } from "../assets/img/4.svg"
import { ReactComponent as Hesab } from "../assets/img/5.svg"
import { ReactComponent as Telefon } from "../assets/img/6.svg"

const Nav = styled.nav`
    width: 96px;
    background: ${props => props.theme.black}
    color: ${props => props.theme.white}
    height: calc(100vh - 80px);
    position: fixed;
    z-index: 99;
    left: 0;
    top: 80px;
    user-select: none;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-top: 7px;
 
`
const MenuItem = styled("a")`
    display: block;
    text-align: center;
    margin: 10px 11px;
    font-size: 11px
    color: ${props => props.theme.white}
    transition: all .2s ease-in-out;
    p{
        opacity:0.5
        line-height: 14px;
    }
    path{
        transition: all .2s ease-in-out;
    }
    &:hover{
        cursor: pointer;
        opacity: 1;
        color: ${props => props.theme.green}
        *{
            fill: ${props => props.theme.green}
        }
    }
`

export default function Sidebar() {
  return (
    <Nav>
      <MenuItem>
        <Davam />
        <p>Davamiyyət </p>
      </MenuItem>
      <MenuItem>
        <Jurnal />
        <p>Əməkhaqqı jurnalı </p>
      </MenuItem>
      <MenuItem>
        <Dovr />
        <p>Dövriyyə jurnalı </p>
      </MenuItem>
      <MenuItem>
        <Borc />
        <p>Borclar jurnalı </p>
      </MenuItem>
      <MenuItem>
        <Hesab />
        <p>Hesabatlar </p>
      </MenuItem>
      <MenuItem>
        <Telefon />
        <p>Zənglər jurnalı </p>
      </MenuItem>
    </Nav>
  )
}
