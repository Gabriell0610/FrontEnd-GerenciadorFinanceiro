/* eslint-disable no-unused-vars */
import { Content, Button } from "../../components";
import { ContainerButton } from "./styles";
import api from "../../services/api";
import { useEffect, useState } from "react";

const User = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const users = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token.token}`, // o Bearer é necessário para acessar o Auth
      },
    });
    setUsers(users.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Content>
        <ContainerButton>
          <Button value="Criar usuário" variant="btn-primary" />
        </ContainerButton>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.length
              ? users.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </Content>
    </>
  );
};

export default User;
