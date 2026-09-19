
import { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Modal, Container, Badge } from 'react-bootstrap';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = async () => {
    try {
      const response = await api.get('/ventas');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al cargar ventas', error);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const verDetalle = async (venta) => {
    try {
      setVentaSeleccionada(venta);
      const res = await api.get(`/ventas/${venta.id_venta}/detalles`);
      setDetalles(res.data);
      setShowModal(true);
    } catch (error) {
      alert('Error al cargar el detalle');
    }
  };

  const cancelarVenta = async (id) => {
    if (window.confirm('¿Seguro que deseas anular esta venta?')) {
      try {
        await api.put(`/ventas/${id}/cancelar`);
        cargarVentas();
      } catch (error) {
        alert('Error al cancelar la venta');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Registro de Ventas</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.nomCliente}</td>
              <td>{new Date(v.fecha_venta).toLocaleDateString()}</td>
              <td>${Number(v.total).toLocaleString()}</td>
              <td>
                <Badge bg={v.estado === 'Completada' ? 'success' : 'danger'}>
                  {v.estado}
                </Badge>
              </td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => verDetalle(v)}>
                  Ver Detalle
                </Button>
                {v.estado !== 'Cancelada' && (
                  <Button variant="danger" size="sm" onClick={() => cancelarVenta(v.id_venta)}>
                    Anular
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para ver detalles de la venta */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Venta #{ventaSeleccionada?.id_venta}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Cliente:</strong> {ventaSeleccionada?.nomCliente}</p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((d) => (
                <tr key={d.id_detalle}>
                  <td>{d.nomProducto}</td>
                  <td>{d.cantidad}</td>
                  <td>${Number(d.precio_unitario).toLocaleString()}</td>
                  <td>${Number(d.subtotal).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total: ${Number(ventaSeleccionada?.total).toLocaleString()}</h4>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Ventas;
