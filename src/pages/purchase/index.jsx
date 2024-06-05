/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Content, Button, LoadingComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import moment from "moment";

const Purchase = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function getPurchase() {
    setLoading(true);
    try {
      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      });

      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro", error);
      setLoading(false);
    }
  }

  const convert = (value) => {
    const convert = value.toLocaleString("pt-bt", {
      style: "currency",
      currency: "BRL",
    });

    return convert;
  };

  async function removeCoin(id) {
    setLoading(true);
    try {
      const msg = confirm("Tem certeza que deseja remover o dado?");
      if (msg) {
        await api.delete(`/sales/${id}`, {
          headers: {
            Authorization: `Bearer ${token?.token}`,
          },
        });
      }
      getPurchase();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Erro ao remover o dado");
    }
  }

  useEffect(() => {
    getPurchase();
  }, []);

  return (
    <Content>
      <div className="container-button">
        <Button
          value="Nova Compra"
          variant="btn-primary"
          onClick={() => navigate("/purchase/form")}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Moeda</th>
            <th>Data</th>
            <th>Unidade</th>
            <th>Valor da unidade</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.length
            ? data.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.coin}</td>
                  <td>{moment(data?.date_purchase).format("DD/MM/YYYY")}</td>
                  <td>{data.unity}</td>
                  <td>{convert(data.value_purchase)}</td>
                  <td>{convert(data.total_money_purchase)}</td>
                  <td>
                    <div className="action-btn-div">
                      <Button
                        value="Excluir"
                        variant="btn-danger"
                        onClick={() => removeCoin(data.id)}
                      />
                      <Button
                        value="Editar"
                        variant="btn-warning"
                        onClick={() => navigate(`/purchase/form/${data.id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </Content>
  );
};

export default Purchase;
