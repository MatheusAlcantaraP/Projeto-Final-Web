import dbConexao from "@/app/libs/db-conexao";
import "@/app/styles/playlistShow.css";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/session";
import BuscaMusicas from "@/app/ui/busca-musica";
import EditPlaylistClient from './edit-playlist';
import Link from 'next/link';
import { PlaylistProps } from "@/app/ui/card-playlist"

const arquivo = 'db-playlist.json';

const dbMusicasPath = "db-musicas.json";


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
          <Link href={`/dashboard/playlists`}>
            <button className="BTNmusica">Ver Playlists</button>
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
              <div className="containerMeio">
                <div className="BTNpl">
                  <a className="BTNbusca">Buscar Musica</a>
                  <a className="BTNmostrar">Ver Playlist</a>
                  <a className="BTNedit">Editar Playlist</a>
                </div>
                <div>
                  <EditPlaylistClient playlistId={playlistToEdit.id} />
                  
                </div>
              </div>
          </div>

    </div>
  );
  }
