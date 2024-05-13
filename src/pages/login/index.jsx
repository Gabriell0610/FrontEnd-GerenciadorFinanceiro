import { Main, Body, Logo } from "./styles";
import { Input } from "../../components/";

const Login = () => {
  return (
    <Main>
      <Body>
        <Logo>Gerenciador Financeiro</Logo>
        <Input label="Email" placeholder="Digite o email" />
        <Input label="Senha" placeholder="Digite sua senha" type="password" />
      </Body>
    </Main>
  );
};

export default Login;
