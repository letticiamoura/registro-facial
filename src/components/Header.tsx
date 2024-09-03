import { Link } from "react-router-dom";

export default function Header() {
    return(
        <Link to="/">
            <header className="rounded-bl-[15px] rounded-br-[15px] shadow-md bg-orange-500 w-full">

                <h1 className="py-5 text-center text-5xl font-extrabold font-serif text-zinc-50">Alfatec</h1>

            </header>
        </Link>
    )
}