import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../../widgets/MainLayout/MainLayout";
import { AppRoutes } from "../router/Routes";

export function App(){
    return (
        <>
            <AppRoutes/>
        </>
    )
}