/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { Content, Button, LoadingComponent } from "../../components";
import { ContainerButton, ActionButtonDiv } from "./styles";
import api from "../../services/api";
import { useEffect, useState } from "react";

const User = () => {
  const token = JSON.parse(localStorage.getItem("token")); // pegando o token do localStorage
  const [users, setUsers] = useState([]); // Criando um estado para os usuarios em forma de array

  const [loading, setLoading] = useState(false); //Setando o estado do loading

  async function getUsers() { // Função responsável por pegar os usuários pela API
    setLoading(true)
    try {
        const users = await api.get("/user", {
            headers: { // Colocando o token dentro do headers
              Authorization: `Bearer ${token.token}`, // o Bearer é necessário para acessar o Auth
            },
          });
        setUsers(users.data); // setando users
        setLoading(false)
    } catch (error) {
        setLoading(false)
        alert("Não foi possível carregar os usuários",)
    }
  }

	async function removeUser(id) { // Função que deleta os usuários
		setLoading(true)
		try {
			await api.delete(`/user/${id}`, {
				headers: { 
					Authorization: `Bearer ${token.token}`,
				},
			})

			setUsers(users.filter((data) => {
				return data.id != id
			}))
			
			console.log("Deletado com sucesso", id)
			setLoading(false)
	} catch (error) {
			setLoading(false)
			alert("Usuário/a não encontrado",)
	}
	}

  useEffect(() => { // Quando o componente for iniciado ele irá chamar a função getUsers
    getUsers();
		
  }, []);

  return (
    <>
      <Content>
        <ContainerButton>
          <Button value="Criar usuário" variant="btn-primary" />
        </ContainerButton>

				{loading && <LoadingComponent/>} 
        {!loading &&
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
							<th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users?.length // Verificando se o array users possui propriedades - se tiver ele será percorrido para por os dados na tabela
              ? users.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
										<td>
											<ActionButtonDiv>
												<Button value="Excluir" variant="btn-danger" onClick={() =>  removeUser(data.id)}/>
												<Button value="Editar" variant="btn-warning"/>
											</ActionButtonDiv>
										</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>}
      </Content>
    </>
  );
};

export default User;
