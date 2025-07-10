
import "@/app/styles/404.css"

export default function NotFound() {
  return (
    <main>
      <div>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
      </div>
      <div className="CaixaErro">
        <img className= "vinyl" src="https://i1.wp.com/www.cbvinylrecordart.com/blog/wp-content/uploads/2015/06/classic-vinyl.gif?resize=500%2C281" alt="vinyl" />
        <h1 className="titulo">404 - Página não encontrada</h1>
        <div className="texto">
          <p>Ops! A página que você está procurando não existe.</p>
          <a href="/">Clique para voltar para a Página Inicial</a>
        </div>
      </div>
    </main>
  );
}