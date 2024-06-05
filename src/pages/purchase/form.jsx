/* eslint-disable no-unused-vars */
import {
  Content,
  Input,
  Button,
  MessageError,
  LoadingComponent,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import * as yup from "yup";
import api from "../../services/api";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();

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
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const save = async (data) => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/sales/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        alert("Item editado com sucesso");
      } else {
        await api.post("/sales", data, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
      }
      setLoading(false);
      navigate("/purchase");
    } catch (error) {
      alert("Erro ao salvar os dados");
      console.log("Error response:", error.response);
      setLoading(false);
    }
  };

  async function getPurchaseById() {
    setLoading(true);
    try {
      const dataPurchase = await api.get(`/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      setValue("coin", dataPurchase?.data?.coin);
      setValue("date_purchase", dataPurchase?.data?.date_purchase);
      setValue("unity", dataPurchase?.data?.unity);
      setValue("value_purchase", dataPurchase?.data?.value_purchase);
      setValue(
        "total_money_purchase",
        dataPurchase?.data?.total_money_purchase
      );
      setLoading(false);
    } catch (error) {
      console.log("Error response:", error.response);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) getPurchaseById();
  }, [id]);

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
              <Button
                value={id ? "Editar" : "Salvar"}
                variant="btn-primary"
                type="submit"
              />
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
