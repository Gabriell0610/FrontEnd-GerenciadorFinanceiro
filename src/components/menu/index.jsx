/* eslint-disable react/prop-types */
import { Menu, Header, Content } from "./styles";

const MenuComponent = ({ children }) => {
  return (
    <>
      <Menu></Menu>
      <Header></Header>
      <Content>{children}</Content>
    </>
  );
};

export default MenuComponent;
