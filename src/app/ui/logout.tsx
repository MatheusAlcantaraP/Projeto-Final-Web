import '@/app/styles/logout.css';
import { redirect } from "next/navigation";
import { deleteSessionCookie } from "../libs/session"
import { isSessionValid } from "@/app/libs/session";

export default async function LogoutButton(){

    const session = await isSessionValid();

    const logout = async () => {
        'use server';
        await deleteSessionCookie();
        redirect('/login');
    }

    if(!session)
    return;
    
    return(
        <form action={logout} className='logout'>
            <button className='logoutBTN'>Sair</button>
        </form>
    )
}