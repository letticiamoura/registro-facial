import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout({children}: ILayoutProps) {
    return(
        <section>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </section>
    )
}