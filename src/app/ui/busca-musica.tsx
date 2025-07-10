
import "@/app/styles/api-busca.css";

import { useState } from "react";

interface Musica {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    previewUrl: string;
    collectionName: string;
}

interface Props {
  playlistId: string;
}

export default function BuscaMusicas({ playlistId }: Props) {
  const [pesquisa, setPesquisa] = useState("");
  const [musicas, setMusicas] = useState([] as Musica[]);

    const buscar = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!pesquisa.trim()) return;

    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(pesquisa)}&media=music&limit=10`);
    const data = await response.json();
    setMusicas(data.results);
  };

  async function adicionarMusica(m: Musica) {
    const response = await fetch("/api/musicas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...m,
        playlistID: playlistId, 
      }),
    });

    const data = await response.json();

  }

  return (
    <div>
    <div className="apibox">
      <div className="buscaBOX">
        <input className="buscaMSC" type="search" placeholder="O que você quer ouvir?" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}/>
        <button className="btnBusca" onClick={buscar}>🔍</button>
      </div>
      <div className="musicasBOX">
        <ul>
          {musicas.map((m) => (
              <li key={m.previewUrl} style={{ marginBottom: "1rem" }}>
              <img src={m.artworkUrl100} alt={m.trackName} />
              <div className="infoMSC">
                  <p className="nomeMusica">{m.trackName} - {m.artistName}</p>
                  <p className="albumMusica">{m.collectionName}</p>
                  <div className="previewBOX">
                    <audio controls src={m.previewUrl} />
                  </div>
              </div>
              <div className="addBTNbox">
                  <button className="addMusicBTN" onClick={() => adicionarMusica(m)}>+</button>
              </div>
              </li>
          ))}
          </ul>
        </div>
    </div>
    </div>
  );
}