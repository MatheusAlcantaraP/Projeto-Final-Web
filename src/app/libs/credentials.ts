'use server';

import {redirect} from "next/navigation";
import {LoginCredentials} from "../(auth)/login/page";
import {PlaylistCredentials} from "../dashboard/page"
import { createSessionToken } from "./session";
import { isSessionValid } from "./session";
import bcrypt from 'bcrypt';
import dbConexao from "./db-conexao";


const dbUsuarioPath = 'db-usuario.json'
const dbPlaylistPath = 'db-playlist.json'

export async function createUser(data: LoginCredentials){

    const email = data.email;
    const senha = data.senha;

    const senhacrypt = await bcrypt.hash(senha, 10);

    const NovoUsuario = {
        id: crypto.randomUUID(),
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
        await createSessionToken(usuario.id, usuario.email);
        return {success: 'Login realizado com sucesso!', email: usuario.email };
    }

}

export async function createPlaylist(data: PlaylistCredentials)
{
    const session = await isSessionValid();
    if (!session) return { error: "Usuário não autenticado" };


    const NovaPlaylist = {
        id: crypto.randomUUID(),
        nome: data.nomePl,
        url: data.imgURL,
        estilo: data.estiloPl,
        userEmail: session.userEmail
    }

    const playlistDB = await dbConexao.retornaDB(dbPlaylistPath)
    playlistDB.push(NovaPlaylist)
    dbConexao.armazenaDB(dbPlaylistPath, playlistDB)

    return {success:'Playlist criada com sucesso!', id: NovaPlaylist.id}
}