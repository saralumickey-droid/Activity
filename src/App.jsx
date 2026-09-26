import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Menu from './components/menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';

function App() {
  return (
    <>
      <Menu />
      <div className="container mt-4 mb-5">
        <h1 className="text-center mb-4">Panel Principal - Tienda Ej</h1>
        
        {}
        <section className="section-card" id="clientes">
          <Clientes />
        </section>

        {}
        <section className="section-card" id="productos">
          <Productos />
        </section>

        {}
        <section className="section-card" id="ventas">
          <Ventas />
        </section>
      </div>
    </>
  );
}

export default App;
