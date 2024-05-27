import { Content, Button } from "../../components"
import {ContainerButton} from "./styles"

const User = () => {
    return (
        <>
            <Content>
                <ContainerButton>
                    <Button value="Criar usuário" variant="btn-primary"/>
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
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
            </Content>
        </>
    )
}


export default User