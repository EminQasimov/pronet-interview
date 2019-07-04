import React from "react"

import { Row, Col } from "antd"
import styled from "styled-components"

import { ReactComponent as Logo } from "../assets/img/logo.svg"
import { ReactComponent as Envelope } from "../assets/img/envelope.svg"
import { ReactComponent as Bell } from "../assets/img/bell.svg"
import { ReactComponent as DownArrow } from "../assets/img/downArrow.svg"
import profile from "../assets/img/profile.png"

const Header = styled.header`
  position: sticky;
  z-index: 9;
  top: 0;
  background: ${props => props.theme.green};
`
const CompanyLogo = styled(Row)`
  width: 96px;
  height: 80px;
  background: ${props => props.theme.darkGreen};
  transition: opacity 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const Today = styled(Row)`
  width: 296px;
  color: ${props => props.theme.white};
  margin-left: 32px;
`
const DateNow = styled("div")`
  font-size: 16px;
`
const DayNow = styled("div")`
  font-size: 14px;
  opacity: 0.5;
`
const Account = styled(Row)`
  flex: 1;
`
const Profile = styled(Col)`
  width: 48px;
  height: 48px;
  margin: 0 32px;
  border-radius: 999px;
  background: url(${props => props.img}) center/cover;
`
const DisplayName = styled(Col)`
  font-size: 16px;
  color: ${props => props.theme.white};
  margin-left: 36px;

  svg {
    margin-left: 12px;
    vertical-align: middle;
  }
`

export default function() {
  return (
    <Header>
      <Row type="flex" align="middle">
        <CompanyLogo type="flex" justify="space-around" align="middle">
          <Logo />
        </CompanyLogo>
        <Today>
          <DateNow>Bugün, 22 Yanvar 2019</DateNow>
          <DayNow>Çərşənbə</DayNow>
        </Today>
        <Account type="flex" justify="end" align="middle">
          <Col style={{ marginRight: 30 }}>
            <Envelope />
          </Col>
          <Col>
            <Bell />
          </Col>
          <DisplayName>
            Pasha Insurance
            <DownArrow />
          </DisplayName>
          <Profile img={profile} />
        </Account>
      </Row>
    </Header>
  )
}
