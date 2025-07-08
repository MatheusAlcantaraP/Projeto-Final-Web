'use client'

import "@/app/styles/login.css"
import Link from "next/link"
import z from 'zod';
import toast from 'react-hot-toast';
import { validateCredentials } from '@/app/libs/credentials';

export interface LoginCredentials{
    email: string,
    senha: string
}

const LoginFormatoZod = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Senha incorreta'}).trim().min(6, {message: 'Senha requer no mínimo 6 caracteres'})
})

export default function PaginaLogin(){

    const loginfunction = async (formData: FormData) => {

        const loginData: LoginCredentials = {
            email: formData.get('email') as string,
            senha: formData.get('senha') as string
        }

        const validacaoZod = LoginFormatoZod.safeParse(loginData)

        if(!validacaoZod.success)
        {   
            let msgErro = '';

            validacaoZod.error.issues.forEach((issue) => {
                msgErro = msgErro + issue.message + '\n';
            });

            toast.error(msgErro);

            return;
        }

        const LoginResult = await validateCredentials(loginData)

        if(LoginResult.error)
        {
            toast.error(LoginResult.error);
            return;
        }
    }

    return(
        <div >
            <h1>Bem vindo ao seu aplicativo de música!</h1>
            <p className="frase">Faça seu login!</p>
            <div className="containerLogin">
                <form className="formLogin" action={loginfunction}>
                    <input className="inputLogin" name="email" id="email" type="text" placeholder="Email"/>
                    <label htmlFor="EmailLogin"></label>
                    <input className="inputLogin" name="senha" id="senha" type="password" placeholder="Senha"/>
                    <label htmlFor="senha"></label>
                    <button className="loginBTN">Entrar</button>
                    <p className="Registrar">Não possui uma conta? <Link className="linkRegistrar" href="/create">Clique aqui</Link> para se cadastrar! </p>
                </form>
            </div>
        </div>
    )
}