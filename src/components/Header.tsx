import { Link } from "react-router-dom";

export default function Header() {

    return(
        
        <Link to="/">

            <header className="rounded-bl-[35px] rounded-br-[35px] shadow-md bg-blue w-full">

                <h1 className="py-5 text-center text-5xl font-extrabold font-serif text-zinc-200">Alfatec</h1>

            </header>

        </Link>

    )
}