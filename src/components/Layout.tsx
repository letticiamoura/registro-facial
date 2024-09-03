import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout({children}: ILayoutProps) {
    return(
        <section className="h-screen bg-zinc-50">
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </section>
    )
}