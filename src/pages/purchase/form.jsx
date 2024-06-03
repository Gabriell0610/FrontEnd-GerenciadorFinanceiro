/* eslint-disable no-unused-vars */
import {
  Content,
  Input,
  Button,
  MessageError,
  LoadingComponent,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import * as yup from "yup";
import api from "../../services/api";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const schema = yup.object({
    coin: yup.string().required("Campo obrigatório"),
    date_purchase: yup.string().required("Campo obrigatório"),
    unity: yup.number().required().typeError("Campo obrigatório"),
    value_purchase: yup.number().required().typeError("Campo obrigatório"),
    total_money_purchase: yup
      .number()
      .required()
      .typeError("Campo obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const save = (data) => {
    setLoading(true);
    try {
      api.post("/sales", data, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      navigate("/purchase");
      setLoading(false);
      console.log(data);
    } catch (error) {
      alert("Erro ao salvar os dados");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Content>
      <div className="container">
        {loading && <LoadingComponent />}
        {!loading && (
          <form onSubmit={handleSubmit(save)}>
            <div className="row">
              <div className="col">
                <Input
                  label="Moeda"
                  placeholder="Digite a moeda"
                  {...register("coin")}
                />
                {errors?.coin && (
                  <MessageError>{errors.coin.message}</MessageError>
                )}
              </div>
              <div className="col">
                <Input
                  label="Data de Compra"
                  type="date"
                  {...register("date_purchase")}
                />
                {errors?.date_purchase && (
                  <MessageError>{errors.date_purchase.message}</MessageError>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Input
                  label="Quantidade"
                  placeholder="Diga a quantidade"
                  {...register("unity")}
                  type="number"
                />
                {errors?.unity && (
                  <MessageError>{errors.unity.message}</MessageError>
                )}
              </div>
              <div className="col">
                <Input
                  label="Valor da unidade"
                  placeholder="Digite o valor da moeda"
                  type="number"
                  {...register("value_purchase")}
                />
                {errors?.value_purchase && (
                  <MessageError>{errors.value_purchase.message}</MessageError>
                )}
              </div>
              <div className="col">
                <Input
                  label="Valor total"
                  placeholder="Digite o valor total"
                  type="number"
                  {...register("total_money_purchase")}
                />
                {errors?.total_money_purchase && (
                  <MessageError>
                    {errors.total_money_purchase.message}
                  </MessageError>
                )}
              </div>
            </div>

            <div className="action-btn-div">
              <Button value="Salvar" variant="btn-primary" type="submit" />
              <Button
                value="Cancelar"
                variant="btn-warning"
                onClick={() => navigate("/purchase")}
              />
            </div>
          </form>
        )}
      </div>
    </Content>
  );
};

export default Form;
