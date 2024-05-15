import { Main, Body, Logo, Spacing, CreatAcc } from "./styles";
import { Input, Button } from "../../components/";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Body>
        <Logo>Gerenciador Financeiro</Logo>
        <Input label="Email" placeholder="Digite o email" />
        <Spacing></Spacing>
        <Input label="Senha" placeholder="Digite sua senha" type="password" />
        <Spacing></Spacing>
        <Button value="Entrar" variant="btn-primary" />
        <Spacing></Spacing>
        <CreatAcc onClick={() => navigate("/register")}>
          Criar uma conta!
        </CreatAcc>
      </Body>
    </Main>
  );
};

export default Login;
