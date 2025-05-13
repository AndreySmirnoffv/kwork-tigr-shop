import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from '../../pages/auth/register'
import { Login } from '../../pages/auth/login'
import { MainLayout } from '../../widgets/MainLayout/MainLayout'
import { Profile } from '../../pages/profile/ui/Profile'
import { ProtectedRoute } from '../../components/ui/ProtectedRoute'

export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path='/' element={<MainLayout/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}