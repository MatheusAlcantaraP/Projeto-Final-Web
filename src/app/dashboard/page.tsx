'use client';

import { useState } from "react";
import "@/app/styles/playlist.css";

export default function PaginaPlaylist() {
  const [showForm, setShowForm] = useState(false);
  const [playlists, setPlaylists] = useState<{ nome: string; imagem: string; estilo: string }[]>([]);
  const [formData, setFormData] = useState({ nome: "", imagem: "", estilo: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaylists([...playlists, formData]);
    setFormData({ nome: "", imagem: "", estilo: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="containerHeader">
        <h1 className="tituloPrincipal">Página para criar as suas Playlists!</h1>
        <button className="btnPlaylist" onClick={() => setShowForm(true)} aria-label="Adicionar playlist">&#10010;</button>
      </div>

      {showForm && (
        <div className="containerPrincipal" onSubmit={handleSubmit}> 
            <form className="containerPlaylist">
                <input name="nome" className="inputs" placeholder="Nome da Playlist" value={formData.nome} onChange={handleChange} required />
                <input name="imagem" className="inputs" placeholder="URL da Imagem" value={formData.imagem} onChange={handleChange} />
                <input name="estilo" className="inputs" placeholder="Estilo Musical" value={formData.estilo} onChange={handleChange} />
                <button type="submit" className="btnCriarPlaylist">Criar Playlist</button>
            </form>
        </div>
      )}

      <div className="containerPlaylistCriada">
        {playlists.map((pl, i) => (
        <div key={i} className="playlistCriadaBox">
           <img src={pl.imagem || "https://via.placeholder.com/150"} alt={pl.nome} className="playlistImage" />
           <div className="playlistInfo"> 
                <h3 className="playlistTitulo">{pl.nome}</h3>
                <p className="playlistEstilo">Estilo: {pl.estilo || "Não definido"}</p>
                <button className="playlistLinkBTN">Clique para adicionar suas músicas</button>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}