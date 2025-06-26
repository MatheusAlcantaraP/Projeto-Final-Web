import "@/app/styles/login.css"
import Link from "next/link"

export default function PaginaLogin(){

    return(
        <main>
            <h1>Bem vindo ao seu aplicativo de música!</h1>
            <div className="containerLogin">
                <form className="formLogin" action="">
                    <input className="inputLogin" name="email" id="email" type="text" placeholder="Email"/>
                    <label htmlFor="EmailLogin"></label>
                    <input className="inputLogin" name="senha" id="senha" type="password" placeholder="Senha"/>
                    <label htmlFor="senha"></label>
                    <button className="loginBTN">Entrar</button>
                    <p className="Registrar">Não possui uma conta? <Link className="linkRegistrar" href="/create">Clique aqui</Link></p>
                </form>
            </div>
        </main>
    )
}