import { Main, Body, Logo, Spacing, CreatAcc } from "./styles";
import { Input, Button } from "../../components/";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Body>
        <form>
          <Logo>Crie sua conta!</Logo>
          <Input label="Nome" placeholder="Digite seu nome" required={true} />
          <Spacing></Spacing>
          <Input
            label="Email"
            placeholder="Digite o email"
            type="email"
            required={true}
          />
          <Spacing></Spacing>
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            required={true}
          />
          <Spacing></Spacing>
          <Button value="Cadastrar" variant="btn-primary" type="submit" />
          <Spacing></Spacing>
          <CreatAcc onClick={() => navigate("/login")}>Fazer Login!</CreatAcc>
        </form>
      </Body>
    </Main>
  );
};

export default Register;
