import dbConexao from "@/app/libs/db-conexao";
import "@/app/styles/expande-musica.css";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/session";
import MusicasExpandidas from "@/app/ui/expande-musica";
import Link from 'next/link';
import { PlaylistProps } from "@/app/ui/card-playlist"

const arquivo = 'db-playlist.json';
const dbMusicasPath = "db-musicas.json";

interface PlaylistIDProps {
    params: { id: string };
}

export default async function MostraMusica({ params }: PlaylistIDProps) {

    const session = await isSessionValid();

    if (!session) {
        redirect('/login');
    }

    const {id} = await params;
    const playlists = await dbConexao.retornaDB(arquivo);
    const IDplaylist: PlaylistProps = playlists.find((p: PlaylistProps) => p.id === id);

    return (
        <div className="paginaMusica">
            <div>
				<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
			</div>
            <Link href={`/dashboard/playlists`}>
            <button className="BTNmusica">Ver Playlists</button>
            </Link>
            <div className="containerPlaylistCriada">
                <div className="containerInfos">
                    <img
                    src={IDplaylist.url || "https://via.placeholder.com/150"}
                    alt="Capa"
                    className="playlistImage"
                    />
                    <div className="playlistInfo">
                        <p className="playlistNome">{IDplaylist.nome}</p>
                        <p className="playlistEstilo">{IDplaylist.estilo}</p>
                        <p className="playlistDescricao">{IDplaylist.descricao}</p>
                    </div>
                </div>
                <div className="containerMeio">
                    <div className="BTNpl">
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}`}>Buscar Musicas</Link>
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/mostraMSC`}>Ver Playlist</Link>
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/edit`}>Editar Playlist</Link>
                    </div>
                        <div>
                            <MusicasExpandidas playlistId={id}/>
                        </div>
                </div>
            </div>
        </div>
  );
  }
