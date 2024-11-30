import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {

    return(
        
        <Link to="/">

            <header className="rounded-bl-[35px] rounded-br-[35px] shadow-md bg-slate-950 w-full">

                <img src={logo} alt="Logo Ada" className="h-28 p-2 m-auto" title="Logo ADDA"/>

            </header>

        </Link>

    )
}