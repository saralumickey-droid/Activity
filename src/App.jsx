import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';

function App() {
  return (
    <>
      <Menu />

      <div className="container mt-4 mb-5">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center mb-4">
                Panel Principal - Tienda Ej
              </h1>
            }
          />

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
