import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingSplashScreen from './pages/LandingSplashScreen';
import MenuBrowser from './pages/MenuBrowser';
import Dish from './pages/Dish';
import CartConfirmation from './pages/CartConfirmation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page — design plein écran, pas de header */}
        <Route path="/" element={<LandingSplashScreen />} />

        {/* Pages avec le layout commun (grain, glow, header) */}
        <Route element={<Layout />}>
          <Route path="/menu" element={<MenuBrowser />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/cart" element={<CartConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
