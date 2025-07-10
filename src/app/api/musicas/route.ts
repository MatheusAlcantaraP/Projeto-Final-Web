import { NextRequest, NextResponse } from "next/server";
import dbConexao from "@/app/libs/db-conexao";

const dbMusicasPath = "db-musicas.json";

export async function POST(request: NextRequest) {
  try {
    const musica = await request.json();

    // Validação básica
    if (!musica || !musica.trackId) {
      return NextResponse.json({ success: false, message: "Dados inválidos" }, { status: 400 });
    }

    // Carrega as músicas atuais
    const musicasAtuais = await dbConexao.retornaDB(dbMusicasPath);

    // Adiciona a música nova
    musicasAtuais.push(musica);

    // Salva de volta no arquivo JSON
    await dbConexao.armazenaDB(dbMusicasPath, musicasAtuais);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao adicionar música:", error);
    return NextResponse.json({ success: false, message: "Erro interno" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playlistID = searchParams.get("playlistID");

    if (!playlistID) {
      return NextResponse.json({ success: false, message: "playlistID ausente" }, { status: 400 });
    }

    const todasMusicas = await dbConexao.retornaDB(dbMusicasPath);
    const musicasDaPlaylist = todasMusicas.filter((m: any) => m.playlistID === playlistID);

    return NextResponse.json({ success: true, musicas: musicasDaPlaylist });
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    return NextResponse.json({ success: false, message: "Erro ao buscar músicas" }, { status: 500 });
  }
}