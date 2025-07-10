import dbConexao from "@/app/libs/db-conexao";
import "@/app/styles/playlistShow.css";
import { redirect } from "next/navigation";
import Link from 'next/link';

const arquivo = 'db-playlist.json';

interface PlaylistProps {
  id: string;
  nome: string;
  url: string;
  estilo: string;
  email: string;
  descricao: string;
}

interface EditPlaylistProps {
  params: { id: string };
}

export default async function EditPlaylist({ params }: EditPlaylistProps) {

  const { id } = await params;
  const playlists = await dbConexao.retornaDB(arquivo);
  const playlistToEdit: PlaylistProps = playlists.find((p: PlaylistProps) => p.id === id);

  return (

    <div className="paginaMusica">
        <Link href={`/dashboard/playlists`}>
          <button className="BTNMusica">Ver Playlists</button>
        </Link>
        <div className="containerPlaylistCriada">
          <div className="containerInfos">
            <img
              src={playlistToEdit.url || "https://via.placeholder.com/150"}
              alt="Capa"
              className="playlistImage"
            />
            <div className="playlistInfo">
              <p className="playlistNome">{playlistToEdit.nome}</p>
              <p className="playlistEstilo">{playlistToEdit.estilo}</p>
              <p className="playlistDescricao">{playlistToEdit.descricao}</p>
            </div>
          </div>
        </div>
    </div>
  );
}