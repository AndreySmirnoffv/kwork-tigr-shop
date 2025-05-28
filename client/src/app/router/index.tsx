import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Profile } from '../../pages/profile/ui/Profile';
import { ProtectedRoute } from '../../shared/lib/router/ProtectedRoute';
import { Home } from '../../pages/home/index';
import { MainLayout } from '../../widgets/MainLayout/MainLayout';
import { History } from '../../pages/history';
import { About } from '../../pages/about';
import { Refund } from '../../pages/refund/ui/Refund';
import { Succeeded } from '../../pages/succeeded';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
            <Route path='/succeeded' element={
              <ProtectedRoute>
                <Succeeded/>
              </ProtectedRoute>
          } 
            />
          <Route path="/about" element={<About/>}/>
          <Route path="/refund" element={<Refund/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
