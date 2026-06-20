import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingSplashScreen from './pages/LandingSplashScreen';
import MenuBrowser from './pages/MenuBrowser';
import Dish from './pages/Dish';
import CartConfirmation from './pages/CartConfirmation';
import OrderTracking from './pages/OrderTracking';
import OrderReady from './pages/OrderReady';
import Login from './pages/Login';
import ServerMobile from './pages/ServerMobile';
import KitchenDisplay from './pages/KitchenDisplay';
import ManagerDashboard from './pages/ManagerDashboard';
import MenuManagement from './pages/MenuManagement';
import TableQrManagement from './pages/TableQrManagement';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
    <HashRouter>
      <Routes>
        {/* Landing — design plein écran */}
        <Route path="/" element={<LandingSplashScreen />} />

        {/* Parcours client — accès libre (via QR code) */}
        <Route element={<Layout />}>
          <Route path="/menu" element={<MenuBrowser />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/cart" element={<CartConfirmation />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/ready" element={<OrderReady />} />
        </Route>

        {/* Login staff */}
        <Route path="/login" element={<Login />} />

        {/* Serveur — protégé */}
        <Route path="/server" element={
          <ProtectedRoute allowedRoles={['serveur', 'manager']}>
            <ServerMobile />
          </ProtectedRoute>
        } />

        {/* Cuisine — protégé */}
        <Route path="/kitchen" element={
          <ProtectedRoute allowedRoles={['cuisinier', 'manager']}>
            <KitchenDisplay />
          </ProtectedRoute>
        } />

        {/* Manager — protégé */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/menu-management" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <MenuManagement />
          </ProtectedRoute>
        } />
        <Route path="/tables" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <TableQrManagement />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
