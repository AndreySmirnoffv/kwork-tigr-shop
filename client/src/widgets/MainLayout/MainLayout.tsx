import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";


export function MainLayout(){
    return (
        <>
            <Header/>
            <main style={{ padding: "20px" }}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}