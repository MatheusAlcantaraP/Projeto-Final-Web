import dbConexao from "@/app/libs/db-conexao";
import "@/app/styles/playlistMusicas.css";
import { redirect } from "next/navigation";

const arquivo = 'db-playlist.json';

interface PlaylistProps {
  id: string;
  nome: string;
  url: string;
  estilo: string;
  email: string;
}

interface EditPlaylistProps {
  params: { id: string };
}

export default async function EditPlaylist({ params }: EditPlaylistProps) {

  const { id } = params;
  const playlists = await dbConexao.retornaDB(arquivo);
  const playlistToEdit: PlaylistProps = playlists.find((p: PlaylistProps) => p.id === id);

  return (
    <div className="containerPlaylistCriada">
      <h2>Editar Playlist</h2>
      <form className="playlistCriadaBox">
        <img
          src={playlistToEdit.url || "https://via.placeholder.com/150"}
          alt="Capa"
          className="playlistImage"
        />
        <div className="playlistInfo">
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome da Playlist"
            defaultValue={playlistToEdit.nome}
            className="inputs"
          />
          <input
            type="text"
            id="url"
            name="url"
            placeholder="URL da Imagem"
            defaultValue={playlistToEdit.url}
            className="inputs"
          />
          <input
            type="text"
            id="estilo"
            name="estilo"
            placeholder="Estilo Musical"
            defaultValue={playlistToEdit.estilo}
            className="inputs"
          />
          <button type="submit" className="playlistLinkBTN">Atualizar</button>
        </div>
      </form>
    </div>
  );
}