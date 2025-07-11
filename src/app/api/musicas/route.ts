import { NextRequest, NextResponse } from "next/server";
import dbConexao from "@/app/libs/db-conexao";

const dbMusicasPath = "db-musicas.json";

export async function POST(request: NextRequest) {
    try {
        const musica = await request.json();

        if (!musica || !musica.trackId) {
        return NextResponse.json({ success: false, message: "Dados inválidos" }, { status: 400 });
        }

        const novaMusica = {
            trackId: musica.trackId,
            trackName: musica.trackName,
            artistName: musica.artistName,
            artworkUrl100: musica.artworkUrl100,
            previewUrl: musica.previewUrl,
            collectionName: musica.collectionName,
            primaryGenreName: musica.primaryGenreName,
            playlistID: musica.playlistID
        };

        const musicasAtuais = await dbConexao.retornaDB(dbMusicasPath);

        musicasAtuais.push(novaMusica);

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

        if(!playlistID) {
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

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const trackId = Number(searchParams.get("trackId"));

        if(!trackId) {
            return NextResponse.json({ success: false, message: "trackId ausente" }, { status: 400 });
        }

        const musicas = await dbConexao.retornaDB(dbMusicasPath);
        const novaLista = musicas.filter((musica: any) => musica.trackId !== trackId);

        await dbConexao.armazenaDB(dbMusicasPath, novaLista);

        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error("Erro ao remover música:", error);
        return NextResponse.json({ success: false, message: "Erro interno ao remover" }, { status: 500 });
    }
}