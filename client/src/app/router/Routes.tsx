import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from '../../pages/profile/ui/Profile'
import { ProtectedRoute } from '../../shared/lib/router/ProtectedRoute'
import { Home } from '../../pages/home/index'
import { MainLayout } from '../../widgets/MainLayout/MainLayout'

export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Route>
            </Routes>
        </BrowserRouter>
    )
}
