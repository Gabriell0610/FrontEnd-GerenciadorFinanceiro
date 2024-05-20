/* eslint-disable no-unused-vars */
import { Main, Body, Logo, Spacing, CreatAcc } from "./styles";
import { Input, Button, MessageError } from "../../components/";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object({
    // Fazendo a validação com o yup
    email: yup.string().required("Campo Obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(6, "Mínimo de 6 caracteres "),
  });

  const {
    // Importando algumas propriedades do hookform
    handleSubmit, //Responsável por chamar a validação
    register, //Responsável por registrar o input dentro do reactiveform
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); // biblioteca para que o hookform consiga se comunicar com o YUP

  const login = async (data) => {
    console.log(data);
  };

  return (
    <Main>
      <Body>
        <form onSubmit={handleSubmit(login)}>
          <Logo>Gerenciador Financeiro</Logo>
          <Input
            label="Email"
            placeholder="Digite o email"
            {...register("email")}
          />
          {errors?.email && <p>{errors.email.message}</p>}
          <Spacing></Spacing>
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            {...register("password")}
          />
          {errors?.password && <p>{errors.password.message}</p>}
          <Spacing></Spacing>
          <Button value="Entrar" variant="btn-primary" type="submit" />
          <Spacing></Spacing>
          <CreatAcc onClick={() => navigate("/register")}>
            Criar uma conta!
          </CreatAcc>
        </form>
      </Body>
    </Main>
  );
};

export default Login;
