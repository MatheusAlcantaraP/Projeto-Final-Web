import "@/app/styles/login.css"

export default function PaginaLogin(){

    return(
        <main>
            <h1>Bem vindo ao seu aplicativo de música!</h1>
            <div className="containerLogin">
                <form className="formLogin" action="">
                    <input className="inputLogin" name="emailLogin" id="emailLogin" type="text" placeholder="Email"/>
                    <label htmlFor="EmailLogin"></label>
                    <input className="inputLogin" name="senhaLogin" id="senhaLogin" type="password" placeholder="Senha"/>
                    <label htmlFor="senhaLogin"></label>
                    <button className="loginBTN">Entrar</button>
                    <p className="Registrar">Não possui uma conta? <a className="linkRegistrar" href="">Clique aqui</a></p>
                </form>
            </div>
        </main>
    )
}