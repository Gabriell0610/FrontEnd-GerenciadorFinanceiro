/* eslint-disable no-unused-vars */
import { Main, Body, Logo, Spacing, CreatAcc } from "./styles";
import { Input, Button } from "../../components/";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const save = async (ev) => {
    ev.preventDefault();
    await api.post("/user", data);
    alert("Usuário criado com sucesso");
  };

  return (
    <Main>
      <Body>
        <form onSubmit={save}>
          <Logo>Crie sua conta!</Logo>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            required={true}
            value={data.name}
            onChange={(ev) => setData({ ...data, name: ev.target.value })}
          />
          <Spacing></Spacing>
          <Input
            label="Email"
            placeholder="Digite o email"
            type="email"
            required={true}
            value={data.email}
            onChange={(ev) => setData({ ...data, email: ev.target.value })}
          />
          <Spacing></Spacing>
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            required={true}
            value={data.password}
            onChange={(ev) => setData({ ...data, password: ev.target.value })}
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
