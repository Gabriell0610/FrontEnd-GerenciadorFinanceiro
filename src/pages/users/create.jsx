/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import {
  Content,
  Input,
  MessageError,
  Button,
  LoadingComponent,
} from "../../components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spacing, ActionButtonDiv, Title } from "./styles";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const create = () => {
  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo 6 caracteres"),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const {
    handleSubmit,
    register,
    setValue, //Responsável por pegar os valores de cada input
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function getUserById() {
    setLoading(true);
    try {
      const user = await api.get(`/user/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setValue("name", user?.data?.name);
      setValue("email", user?.data?.email);

      console.log(user.data);
      setLoading(false);
    } catch (error) {
      alert("Erro");
      setLoading(false);
    }
  }

  async function saveUser(data) {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/user/${Number(id)}`, data, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        alert("Usuário editado com sucesso!");
      } else {
        await api.post("/user", data);
        alert("Usuário criado com sucesso!");
      }
      setLoading(false);
      navigate("/user");
    } catch (error) {
      setLoading(false);
      alert("Erro ao criar o usuário");
    }
  }

  useEffect(() => {
    if (id) getUserById();
  }, [id]);

  return (
    <Content>
      <Title>{id ? "Edite o usuário" : "Crie um usuário novo"}</Title>
      {loading && <LoadingComponent />}
      {!loading && (
        <form onSubmit={handleSubmit(saveUser)}>
          <Input
            label="Name"
            placeholder="Digite seu nome"
            {...register("name")}
          />
          {errors?.name && <MessageError>{errors?.name.message}</MessageError>}

          <Spacing />

          <Input
            label="Email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors?.email && (
            <MessageError>{errors?.email.message}</MessageError>
          )}

          <Spacing />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            {...register("password")}
          />
          {errors?.password && (
            <MessageError>{errors?.password.message}</MessageError>
          )}

          <Spacing />

          <ActionButtonDiv>
            <Button
              value={id ? "Editar" : "Salvar"}
              type="submit"
              variant="btn-primary"
            />
            <Button
              value="Cancelar"
              variant="btn-warning"
              onClick={() => navigate("/user")}
            />
          </ActionButtonDiv>
        </form>
      )}
    </Content>
  );
};

export default create;
