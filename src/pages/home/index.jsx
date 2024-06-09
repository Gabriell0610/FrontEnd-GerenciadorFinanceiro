/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";
import api from "../../services/api";
import { Title, Value } from "./styles";

const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  async function getTotal() {
    setLoading(true);
    try {
      const totalProfit = await api.get("/sales/get/total", {
        headers: {
          Authorization: token?.token,
        },
      });
      setData(totalProfit.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTotal();
  }, []);

  function convertValue(value) {
    if (value) {
      const convert = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return convert;
    }

    return "R$00,0";
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col ">
            <div className="card">
              <Title>Total de Compra</Title>
              <Value>{convertValue(data?.purchaseTotal)}</Value>
            </div>
          </div>
          <div className="col ">
            <div className="card">
              <Title>Total de Venda</Title>
              <Value>{convertValue(data?.salesTotal)}</Value>
            </div>
          </div>
          <div className="col ">
            <div className="card">
              <Title>Lucro Total</Title>
              <Value>{convertValue(data?.profitTotal)}</Value>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
