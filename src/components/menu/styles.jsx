/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { FaHome, FaUser, FaRegMoneyBillAlt  } from "react-icons/fa"


const ICON = `
  color: #fff;
  font-size: 20px;
`

export const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  max-width: 240px;
  width: 240px;
  background-color: #141414;
  padding: .7rem;
`;

export const Title = styled.h2`
  text-align: center;
  color: #fff;
  padding: 10px;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #8c88883d;
  }
`

export const UserContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 gap: .5rem;
 width: 90%;
 position: absolute;
 bottom: 2rem;
 color: #fff;
`

export const UserLogin = styled.div`
  width: 35px;
  height: 35px;
  line-height: 35px;
  background-color: #f0eaea;
  border-radius: 50%;
  text-align: center;
  color: #222;
  font-weight: bold;
`

export const Content = styled.div`
  margin-left: 260px;
  margin-top: 20px;
  margin-right: 1.5rem;
`;

export const Exit = styled.div`
 position: absolute;
 bottom: 2rem;
 width: 90%;
`

export const IconHome = styled(FaHome)`
  ${ICON}
`

export const IconUser = styled(FaUser)`
  ${ICON}
`

export const IconMoney = styled(FaRegMoneyBillAlt)`
  ${ICON}
`


