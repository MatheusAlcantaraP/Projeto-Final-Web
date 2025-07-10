'use client';

import { useState } from "react";

interface Musica {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  collectionName: string;
}

export default function BuscaMusicas() {
  const [pesquisa, setPesquisa] = useState("");
  const [musicas, setMusicas] = useState([] as Musica[]);

  const buscar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!pesquisa.trim()) return;

    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(pesquisa)}&media=music&limit=10`);
    const data = await response.json();
    setMusicas(data.results);

    //const adicionarMusica = async (m: Musica) =>{
    //    return m;
    //}
  };

  return (
    <div>
      <input
        type="search"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      <ul>
        {musicas.map((m) => (
            <li key={m.previewUrl} style={{ marginBottom: "1rem" }}>
            <img src={m.artworkUrl100} alt={m.trackName} />
            <div>
                <p>{m.trackName} - {m.artistName}</p>
                <p>{m.collectionName}</p>
                <div>
                <audio controls src={m.previewUrl} />
                </div>
                { <button/* onClick={() => adicionarMusica(m)}*/>Adicionar à playlist</button>}
            </div>
            </li>
        ))}
        </ul>
    </div>
  );
}