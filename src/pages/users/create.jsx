/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import {Content, Input, MessageError, Button} from "../../components"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Register from "../register"
import { Spacing, ActionButtonDiv, Title } from "./styles"
import api from "../../services/api"


const create = () => {
    const schema = yup.object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório").email("Email inválido"),
        password: yup.string().required("Campo obrigatório").min(6, "Mínimo 6 caracteres")
    })

    const { 
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({resolver: yupResolver(schema)})

    function cancel() {
        
    }

    function save(data) {
        console.log(data)
    }

    return (
        <Content>
            <Title>Crie um usuário novo</Title>
            <form onSubmit={handleSubmit(save)}>
                <Input 
                label="Name"
                placeholder="Digite seu nome"
                {...register("name")}
                />
                {errors?.name && <MessageError>{errors?.name.message}</MessageError>}

                <Spacing/>

                <Input 
                label="Email"
                placeholder="Digite seu email"
                {...register("email")}/>
                {errors?.email && <MessageError>{errors?.email.message}</MessageError>}

                <Spacing/>

                <Input 
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                {...register("password")}/>
                {errors?.password && <MessageError>{errors?.password.message}</MessageError>}

                <Spacing/>

                <ActionButtonDiv>
                    <Button value="Salvar" type="submit" variant="btn-primary"/>
                    <Button value="Cancelar" variant="btn-warning" onClick={() => cancel()}/> 
                </ActionButtonDiv>
                
                
            </form>
        </Content>
    )
}

export default create