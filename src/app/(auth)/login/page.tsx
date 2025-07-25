'use client'

import "@/app/styles/login.css"
import z from 'zod';
import toast from 'react-hot-toast';
import Image from "next/image";
import Link from "next/link"
import userlogin from "public/user-login.gif"
import { validateCredentials } from '@/app/libs/credentials';
import { redirect } from "next/navigation";

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
        else if(LoginResult.success)
        {
            toast.success(LoginResult.success);
            redirect('/dashboard');
        }
        
    }

    return(
        <div>
            <div>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
                <h1>Bem vindo ao seu aplicativo de música!</h1>
            </div>
            <div className="containerLogin">
                <form className="formLogin" action={loginfunction}>
                    <Image className='userIMG'src={userlogin} alt=""/>
                    <input className="inputLogin" name="email" id="email" type="text" placeholder="Email"/>
                    <label htmlFor="EmailLogin"></label>
                    <input className="inputLogin" name="senha" id="senha" type="password" placeholder="Senha"/>
                    <label htmlFor="senha"></label>
                    <button className="loginBTN">Entrar</button>
                    <p className="Registrar">Não possui uma conta? <Link className="linkRegistrar" href="/create">Clique aqui</Link> para se cadastrar! </p>
                </form>
                <div className="texto">
                    <h2 className="frase">Faça<br />
                    seu<br />
                    login!</h2>
                    <p>Entre na sua conta, crie várias playlists, pesquise e favorite suas músicas!</p>
                </div>
            </div>
        </div>
       
    )
}