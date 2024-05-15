import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Body = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  width: 350px;
`;

export const Logo = styled.h1`
  text-align: center;
`;

export const Spacing = styled.div`
  margin-bottom: 1rem;
`;

export const CreatAcc = styled.p`
  color: #636060;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: #1e78ee;
  }
`;
