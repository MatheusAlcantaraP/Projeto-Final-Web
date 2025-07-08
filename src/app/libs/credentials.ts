'use server';

import {redirect} from "next/navigation";
import {LoginCredentials} from "../(auth)/login/page";
import bcrypt from 'bcrypt';
import dbConexao from "./db-conexao";

const dbUsuarioPath = 'db-usuario.json'

export async function createUser(data: LoginCredentials){

    const email = data.email;
    const senha = data.senha;

    const senhacrypt = await bcrypt.hash(senha, 10);

    const NovoUsuario = {
        email,
        senha: senhacrypt 
    }

    const usuariosDB = await dbConexao.retornaDB(dbUsuarioPath)

    for(const usuario of usuariosDB)
    {
        if(email === usuario.email)
        {
            return {error:'Usuário ou senha inválido!'};
        }
    }

    usuariosDB.push(NovoUsuario)
    dbConexao.armazenaDB(dbUsuarioPath, usuariosDB)
    return {success:'Usuário criado com sucesso!'}
}

export async function validateCredentials(data: LoginCredentials){

    const email = data.email;
    const senha = data.senha;

    const usuariosDB = await dbConexao.retornaDB(dbUsuarioPath);

    const usuario = usuariosDB.find((u) => u.email === email);

    const verificaSenha = await bcrypt.compare(senha, usuario.senha);

    if(!usuario ||!verificaSenha)
    {
        return {error:'Usuário ou senha inválido!'};
    }
    else{
        redirect('/dashboard');
    }

}