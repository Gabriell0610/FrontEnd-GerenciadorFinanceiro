/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Main, Body, Logo, Spacing, CreatAcc } from "./styles";
import {
  Input,
  Button,
  MessageError,
  LoadingComponent,
} from "../../components/";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  //Dizendo que o estado do loading é false
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fazendo a validação com o yup
  const schema = yup.object({
    email: yup.string().required("Campo Obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(4, "Mínimo de 4 caracteres "),
  });

  // destruturando o useForm e pegando algumas propriedades
  const {
    handleSubmit, //Responsável por chamar a validação
    register, //Responsável por registrar o input dentro do useForm
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); // biblioteca para que o hookform consiga se comunicar com o YUP

  //Função responsável por pegar o token após o login do usuário
  const loginUser = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3333/login", data);

      const token = { token: response?.data.token }; // transformando o token em um objeto
      localStorage.setItem("token", JSON.stringify(token)); // salvando no localStorage

      setLoading(false);

      navigate("/");
    } catch (error) {
      alert("Erro");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Main>
      <Body>
        {loading && <LoadingComponent />}
        {!loading && (
          <form onSubmit={handleSubmit(loginUser)}>
            <Logo>Gerenciador Financeiro</Logo>
            <Input
              label="Email"
              placeholder="Digite o email"
              {...register("email")} // Registrando o email no useForm e fazendo a validação
            />
            {errors?.email && (
              <MessageError>{errors.email.message}</MessageError>
            )}

            <Spacing></Spacing>
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              {...register("password")}
            />

            {errors?.password && (
              <MessageError>{errors.password.message}</MessageError>
            )}
            <Spacing></Spacing>

            <Button value="Entrar" variant="btn-primary" type="submit" />
            <Spacing></Spacing>

            <CreatAcc onClick={() => navigate("/register")}>
              Criar uma conta!
            </CreatAcc>
          </form>
        )}
      </Body>
    </Main>
  );
};

export default Login;
