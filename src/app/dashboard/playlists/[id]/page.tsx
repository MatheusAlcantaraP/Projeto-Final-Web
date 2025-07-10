import dbConexao from "@/app/libs/db-conexao";
import "@/app/styles/playlistShow.css";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/session";
import BuscaMusicas from "@/app/ui/busca-musica";
import EditPlaylistClient from './edit-playlist';

const arquivo = 'db-playlist.json';

const dbMusicasPath = "db-musicas.json";

interface PlaylistProps {
  id: string;
  nome: string;
  url: string;
  estilo: string;
  email: string;
}

interface MusicaProps {
  nome: string;
  artista: string;
  preview: string;
  capa: string;
  genero: string;
  duracao: string;
  playlistID: []
}

interface EditPlaylistProps {
  params: { id: string };
}

export default async function EditPlaylist({ params }: EditPlaylistProps) {

  const { id } = await params;
  const playlists = await dbConexao.retornaDB(arquivo);
  const playlistToEdit: PlaylistProps = playlists.find((p: PlaylistProps) => p.id === id);

  const todasMusicas = await dbConexao.retornaDB(dbMusicasPath);
  const musicas = todasMusicas.filter((p) => p.playlistID === id);
  
  return (
      <div className="paginaMusica">
          <h2 className="tituloMusica">Editar Playlist</h2>
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
              </div>
                <div>
                <EditPlaylistClient playlistId={playlistToEdit.id} />
                <button type="submit" className="playlistLinkBTN">Atualizar</button>
                </div>
              </div>
          </div>

    </div>
  );
  }
