import Image from "next/image"
import itunes from "public/itunes.png"
import LogoutButton from "./logout";


import "@/app/styles/header.css"

export default function Header(){
    return(
        <header className='Header'>
            <Image className='itunesIMG'src={itunes} alt=""/>
            <LogoutButton/>
        </header>
    );
}