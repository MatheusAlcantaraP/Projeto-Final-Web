import "@/app/styles/create.css"
import Link from "next/link"

export default function PaginaRegistrar(){

    return(
        <main>
            <h1>Bem vindo ao seu aplicativo de música!</h1>
            <p className="frase">Crie sua conta agora!</p>
            <div className="containerRegistrar">
                <form className="formRegistrar" action="">
                    <input className="inputR" name="email" id="email" type="text" placeholder="Email"/>
                    <label htmlFor="email"></label>
                    <input className="inputR" name="senha" id="senha" type="password" placeholder="Senha"/>
                    <label htmlFor="senha"></label>
                    <input className="inputR" name="confirmaSenha" id="confirmaSenha" type="password" placeholder="Confirmar Senha"/>
                    <label htmlFor="senha"></label>
                    <button className="registrarBTN">Cadastrar</button>
                    <p className="Login">Já possui uma conta? <Link className="linkLogin" href="/login">Clique aqui</Link></p>
                </form>
            </div>
        </main>
    )
}