'use client'

import "@/app/styles/create.css"
import Link from "next/link"
import z from 'zod'
import toast from 'react-hot-toast'
import {createUser} from '@/app/libs/credentials';
import {LoginCredentials} from "../login/page"
import {redirect} from "next/navigation";
import disco from "public/disco.gif"
import userlogin from "public/user-login.gif"
import Image from "next/image"

const CriarUsuarioFormatoZod = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Insira uma senha'}).trim().min(6, {message: 'Senha precisa no mínimo 6 caracteres'}),
    confirmaSenha: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.senha === data.confirmaSenha, {
    message: "Senhas não conferem",
    path: ["confirmaSenha"]
});


export default function PaginaRegistrar(){

    const createFunction = async (formData: FormData) => {

        const registerData = {
            email: formData.get('email') as string,
            senha: formData.get('senha') as string, 
            confirmaSenha: formData.get('confirmaSenha') as string
        }

        const validacaoZod = CriarUsuarioFormatoZod.safeParse(registerData);

        if(!validacaoZod.success)
        {
            let msgErro = '';

            validacaoZod.error.issues.forEach((issue) => {
                msgErro += issue.message + '\n';
            });

            toast.error(msgErro);

            return;
        }

        const CreateUserResult = await createUser(registerData as LoginCredentials);

        if(CreateUserResult.error)
        {
            toast.error(CreateUserResult.error);
        }
        else if(CreateUserResult.success)
        {
            toast.success(CreateUserResult.success);
            redirect('/login');
        }
    }

    return(
        <main>
            <div>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
                <h1>Bem vindo ao seu aplicativo de música!</h1>
            </div>
            <div className="containerRegistrar">
                <form className="formRegistrar" action={createFunction}>
                    <Image className='userIMG'src={userlogin} alt=""/>
                    <input className="inputR" name="email" id="email" type="text" placeholder="Email"/>
                    <label htmlFor="email"></label>
                    <input className="inputR" name="senha" id="senha" type="password" placeholder="Senha"/>
                    <label htmlFor="senha"></label>
                    <input className="inputR" name="confirmaSenha" id="confirmaSenha" type="password" placeholder="Confirmar Senha"/>
                    <label htmlFor="senha"></label>
                    <button className="registrarBTN">Cadastrar</button>
                    <p className="Login">Já possui uma conta? <Link className="linkLogin" href="/login">Clique aqui</Link> para fazer login!</p>
                </form>
                <div className="texto">
                    <h2 className="frase">Faça<br />
                    seu<br />
                    Cadastro!</h2>
                    <p>Crie sua conta, crie várias playlists, pesquise e favorite suas músicas! </p>
                </div>

            </div>

        </main>
    )
}