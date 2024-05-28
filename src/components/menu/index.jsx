/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Content,
  Title,
  Option,
  IconHome,
  IconUser,
  IconMoney,
  Exit,
} from "./styles";
import { Button } from "../../components";

const MenuComponent = ({ children }) => {
  const navigate = useNavigate();

  function logout() {
    navigate("/login");
    localStorage.clear();
  }

  return (
    <>
      <Menu>
        <Title>Bem Vindo</Title>
        <Option onClick={() => navigate("/")}>
          <IconHome />
          Home
        </Option>
        <Option onClick={() => navigate("/user")}>
          <IconUser />
          Usuários
        </Option>
        <Option onClick={() => navigate("/sales")}>
          <IconMoney />
          Compra
        </Option>
        <Exit>
          <Button value="Sair" variant="btn-danger" onClick={() => logout()} />
        </Exit>
      </Menu>
      <Content>{children}</Content>
    </>
  );
};

export default MenuComponent;
