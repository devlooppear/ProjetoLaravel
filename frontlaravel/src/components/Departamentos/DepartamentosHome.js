import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CardActions,
  Alert
} from '@mui/material';
import axios from 'axios';

const DepartamentosHome = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newDepartamentoDialogOpen, setNewDepartamentoDialogOpen] = useState(false);
  const [editingDepartamento, setEditingDepartamento] = useState(null);
  const [newDepartamento, setNewDepartamento] = useState({ name: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to fetch all departments from the API
  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('http://localhost/api/departamentos');
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setErrorMessage('Erro ao buscar departamentos.');
    }
  };

  // Function to create a new department in the API
  const createDepartamento = async () => {
    try {
      await axios.post('http://localhost/api/departamentos', newDepartamento);
      fetchDepartamentos(); // Update the list of departments after creating a new one
      setNewDepartamentoDialogOpen(false); // Close the dialog
      setNewDepartamento({ name: '' });
      setSuccessMessage('Departamento criado com sucesso.');
    } catch (error) {
      console.error('Error creating department:', error);
      setErrorMessage('Erro ao criar departamento.');
    }
  };

  // Function to update an existing department in the API
  const updateDepartamento = async (departamento) => {
    try {
      await axios.put(`http://localhost/api/departamentos/${departamento.id}`, departamento);
      setDepartamentos(departamentos.map((d) => (d.id === departamento.id ? departamento : d)));
      setEditDialogOpen(false);
      setEditingDepartamento(null);
      setSuccessMessage('Departamento atualizado com sucesso.');
    } catch (error) {
      console.error('Error updating department:', error);
      setErrorMessage('Erro ao atualizar departamento.');
    }
  };

  // Function to delete a department in the API
  const deleteDepartamento = async (id) => {
    try {
      await axios.delete(`http://localhost/api/departamentos/${id}`);
      setDepartamentos(departamentos.filter((d) => d.id !== id));
      setDeleteDialogOpen(false);
      setEditingDepartamento(null);
      setSuccessMessage('Departamento deletado com sucesso.');
    } catch (error) {
      console.error('Error deleting department:', error);
      setErrorMessage('Erro ao deletar departamento.');
    }
  };

  // Function to open the delete confirmation dialog
  const handleDeleteClick = (departamento) => {
    setDeleteDialogOpen(true);
    setEditingDepartamento(departamento);
  };

  // Function to open the edit dialog
  const handleEditClick = (departamento) => {
    setEditDialogOpen(true);
    setEditingDepartamento(departamento);
  };

  // Function to open the new departamento dialog
  const handleNewDepartamentoClick = () => {
    setNewDepartamentoDialogOpen(true);
  };

  // Function to close the delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setEditingDepartamento(null);
  };

  // Function to close the edit dialog
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingDepartamento(null);
  };

  // Function to close the new departamento dialog
  const handleNewDepartamentoDialogClose = () => {
    setNewDepartamentoDialogOpen(false);
  };

  // Function to handle changes in the new departamento input field
  const handleNewDepartamentoChange = (e) => {
    setNewDepartamento({ ...newDepartamento, name: e.target.value });
  };

  // Function to create a new departamento when the user clicks the "Criar" button in the new departamento dialog
  const handleCreateDepartamento = async () => {
    try {
      await createDepartamento(newDepartamento);
      fetchDepartamentos(); // Update the list of departments after creating a new one
      handleNewDepartamentoDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  // Function to update an existing departamento when the user clicks the "Salvar" button in the edit dialog
  const handleUpdateDepartamento = async () => {
    try {
      await updateDepartamento(editingDepartamento);
      handleEditDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  // Function to delete an existing departamento when the user clicks the "Deletar" button in the delete confirmation dialog
  const handleDeleteDepartamento = async () => {
    try {
      await deleteDepartamento(editingDepartamento.id);
      handleDeleteDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Call to fetch the departments when the component is mounted
  useEffect(() => {
    fetchDepartamentos();
  }, []);

  return (
      <div className='mx-5 mt-2'>
        {/* Error and success messages */}
        {errorMessage && <Alert className='mt-3' severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
        <h2 className='mt-3'>Departamentos</h2>
        <Button variant="contained" color="primary" onClick={handleNewDepartamentoClick}>Novo</Button>

        {departamentos.map((departamento) => (
          <div className="card mx-3 mt-3" key={departamento.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{departamento.name}</Typography>
                <div className='mt-1'></div>
                <Typography variant="h6">Id Departamento: {departamento.id}</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => handleEditClick(departamento)}>Editar</Button>
                <Button color="secondary" onClick={() => handleDeleteClick(departamento)}>Deletar</Button>
              </CardActions>
            </Card>
          </div>
        ))}

        {/* Delete confirmation dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirmação</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja deletar o departamento?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">Cancelar</Button>
            <Button onClick={handleDeleteDepartamento} color="secondary">Deletar</Button>
          </DialogActions>
        </Dialog>

        {/* Edit dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Editar Departamento</DialogTitle>
          <DialogContent>
            <TextField label="Nome" value={editingDepartamento ? editingDepartamento.name : ''} onChange={(e) => setEditingDepartamento({ ...editingDepartamento, name: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">Cancelar</Button>
            <Button onClick={handleUpdateDepartamento} color="primary">Salvar</Button>
          </DialogActions>
        </Dialog>

        {/* New departamento dialog */}
        <Dialog open={newDepartamentoDialogOpen} onClose={handleNewDepartamentoDialogClose}>
          <DialogTitle>Novo Departamento</DialogTitle>
          <DialogContent>
            <TextField label="Nome" value={newDepartamento.name} onChange={handleNewDepartamentoChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewDepartamentoDialogClose} color="primary">Cancelar</Button>
            <Button onClick={handleCreateDepartamento} color="primary">Criar</Button>
          </DialogActions>
        </Dialog>
        <div className='mt-5'></div>
      </div>
    );
  };

export default DepartamentosHome;