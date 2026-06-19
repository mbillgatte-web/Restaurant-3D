import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingSplashScreen from './pages/LandingSplashScreen';
import MenuBrowser from './pages/MenuBrowser';
import Dish from './pages/Dish';
import CartConfirmation from './pages/CartConfirmation';
import OrderTracking from './pages/OrderTracking';
import OrderReady from './pages/OrderReady';
import ServerMobile from './pages/ServerMobile';
import KitchenDisplay from './pages/KitchenDisplay';
import ManagerDashboard from './pages/ManagerDashboard';
import MenuManagement from './pages/MenuManagement';
import TableQrManagement from './pages/TableQrManagement';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Landing — design plein écran, pas de layout commun */}
        <Route path="/" element={<LandingSplashScreen />} />

        {/* Parcours client — avec grain overlay et glow */}
        <Route element={<Layout />}>
          <Route path="/menu" element={<MenuBrowser />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/cart" element={<CartConfirmation />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/ready" element={<OrderReady />} />
        </Route>

        {/* Back-office — interfaces autonomes (pas de Layout commun) */}
        <Route path="/server" element={<ServerMobile />} />
        <Route path="/kitchen" element={<KitchenDisplay />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/tables" element={<TableQrManagement />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
