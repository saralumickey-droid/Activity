src/components/Clientes.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });

  const cargarClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al cargar clientes', error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleOpenModal = (cliente = null) => {
    if (cliente) {
      setEditMode(true);
      setCurrentId(cliente.id_cliente);
      setForm({
        nomCliente: cliente.nomCliente,
        contacto: cliente.contacto,
        departamento: cliente.departamento,
        ciudad: cliente.ciudad
      });
    } else {
      setEditMode(false);
      setForm({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/clientes/${currentId}`, form);
      } else {
        await api.post('/clientes', form);
      }
      handleCloseModal();
      cargarClientes();
    } catch (error) {
      alert('Error al guardar cliente');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro de eliminar este cliente?')) {
      try {
        await api.delete(`/clientes/${id}`);
        cargarClientes();
      } catch (error) {
        alert(error.response?.data?.error || 'Error al eliminar');
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Clientes</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + Nuevo Cliente
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomCliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenModal(c)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(c.id_cliente)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Cliente' : 'Nuevo Cliente'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nomCliente" value={form.nomCliente} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto</Form.Label>
              <Form.Control type="text" name="contacto" value={form.contacto} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Control type="text" name="departamento" value={form.departamento} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" name="ciudad" value={form.ciudad} onChange={handleChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Clientes;
