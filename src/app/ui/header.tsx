import Image from "next/image"
import spotify from "public/spotify-logo.png"

import "@/app/styles/header.css"

export default function Header(){
    return(
        <header className='Header'>
            <Image className='spotifyIMG'src={spotify} alt=""/>
            
        </header>
    );
}