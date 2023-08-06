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

const FuncionariosHome = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newFuncionarioDialogOpen, setNewFuncionarioDialogOpen] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [newFuncionario, setNewFuncionario] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department_id: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to fetch all employees from the API
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setErrorMessage('Erro ao buscar funcionários.');
    }
  };

  // Function to create a new employee in the API
  const createFuncionario = async () => {
    try {
      await axios.post('http://localhost:8000/api/funcionarios', newFuncionario);
      fetchFuncionarios(); // Update the list of employees after creating a new one
      setNewFuncionarioDialogOpen(false); // Close the dialog
      setNewFuncionario({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department_id: '',
      });
      setSuccessMessage('Funcionário criado com sucesso.');
    } catch (error) {
      console.error('Error creating employee:', error);
      setErrorMessage('Erro ao criar funcionário.');
    }
  };

  // Function to update an existing employee in the API
  const updateFuncionario = async (funcionario) => {
    try {
      await axios.put(`http://localhost:8000/api/funcionarios/${funcionario.id}`, funcionario);
      setFuncionarios(funcionarios.map((f) => (f.id === funcionario.id ? funcionario : f)));
      setEditDialogOpen(false);
      setEditingFuncionario(null);
      setSuccessMessage('Funcionário atualizado com sucesso.');
    } catch (error) {
      console.error('Error updating employee:', error);
      setErrorMessage('Erro ao atualizar funcionário.');
    }
  };

  // Function to delete an employee in the API
  const deleteFuncionario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/funcionarios/${id}`);
      setFuncionarios(funcionarios.filter((f) => f.id !== id));
      setDeleteDialogOpen(false);
      setEditingFuncionario(null);
      setSuccessMessage('Funcionário deletado com sucesso.');
    } catch (error) {
      console.error('Error deleting employee:', error);
      setErrorMessage('Erro ao deletar funcionário.');
    }
  };

  // Function to open the delete confirmation dialog
  const handleDeleteClick = (funcionario) => {
    setDeleteDialogOpen(true);
    setEditingFuncionario(funcionario);
  };

  // Function to open the edit dialog
  const handleEditClick = (funcionario) => {
    setEditDialogOpen(true);
    setEditingFuncionario(funcionario);
  };

  // Function to open the new funcionario dialog
  const handleNewFuncionarioClick = () => {
    setNewFuncionarioDialogOpen(true);
  };

  // Function to close the delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setEditingFuncionario(null);
  };

  // Function to close the edit dialog
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingFuncionario(null);
  };

  // Function to close the new funcionario dialog
  const handleNewFuncionarioDialogClose = () => {
    setNewFuncionarioDialogOpen(false);
  };

  // Function to handle changes in the new funcionario input fields
  const handleNewFuncionarioChange = (e) => {
    setNewFuncionario({
      ...newFuncionario,
      [e.target.name]: e.target.value,
    });
  };

  // Function to create a new funcionario when the user clicks the "Criar" button in the new funcionario dialog
  const handleCreateFuncionario = async () => {
    try {
      await createFuncionario(newFuncionario);
      fetchFuncionarios(); // Update the list of employees after creating a new one
      handleNewFuncionarioDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  // Function to update an existing funcionario when the user clicks the "Salvar" button in the edit dialog
  const handleUpdateFuncionario = async () => {
    try {
      await updateFuncionario(editingFuncionario);
      handleEditDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // Function to delete an existing funcionario when the user clicks the "Deletar" button in the delete confirmation dialog
  const handleDeleteFuncionario = async () => {
    try {
      await deleteFuncionario(editingFuncionario.id);
      handleDeleteDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Call to fetch the funcionarios when the component is mounted
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  return (
      <div className='mx-5 mt-2'>
        {/* Error and success messages */}
        {errorMessage && <Alert className='mt-3' severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}
        {successMessage && <Alert className='mt-3' severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}

        <h2 className='mt-3'>Funcionarios</h2>
        <Button variant="contained" color="primary" onClick={handleNewFuncionarioClick}>
          Novo
        </Button>

        {funcionarios.map((funcionario) => (
          <div className="card mx-3 mt-3" key={funcionario.id}>
            <Card>
              <CardContent>    
                <Typography variant="h5">
                  {funcionario.firstName} {funcionario.lastName}
                </Typography>
                <Typography variant="h6">Id Funcionário: {funcionario.id}</Typography>
                <Typography variant="body1">Email: {funcionario.email}</Typography>
                <Typography variant="body1">Telefone: {funcionario.phone || 'N/A'}</Typography>
                <Typography variant="body1">ID do Departamento: {funcionario.department_id}</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => handleEditClick(funcionario)}>
                  Editar
                </Button>
                <Button color="secondary" onClick={() => handleDeleteClick(funcionario)}>
                  Deletar
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}

        {/* Delete confirmation dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirmação</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja deletar o funcionario?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteFuncionario} color="secondary">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Editar Funcionario</DialogTitle>
          <DialogContent>
            <TextField label="Nome" name="firstName" value={editingFuncionario ? editingFuncionario.firstName : ''} onChange={handleNewFuncionarioChange} />
            <TextField label="Sobrenome" name="lastName" value={editingFuncionario ? editingFuncionario.lastName : ''} onChange={handleNewFuncionarioChange} />
            <TextField label="Email" name="email" value={editingFuncionario ? editingFuncionario.email : ''} onChange={handleNewFuncionarioChange} />
            <TextField label="Telefone" name="phone" value={editingFuncionario ? editingFuncionario.phone : ''} onChange={handleNewFuncionarioChange} />
            <TextField label="ID do Departamento" name="department_id" value={editingFuncionario ? editingFuncionario.department_id : ''} onChange={handleNewFuncionarioChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleUpdateFuncionario} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        {/* New funcionario dialog */}
        <Dialog open={newFuncionarioDialogOpen} onClose={handleNewFuncionarioDialogClose}>
          <DialogTitle>Novo Funcionario</DialogTitle>
          <DialogContent>
            <TextField label="Nome" name="firstName" value={newFuncionario.firstName} onChange={handleNewFuncionarioChange} />
            <TextField label="Sobrenome" name="lastName" value={newFuncionario.lastName} onChange={handleNewFuncionarioChange} />
            <TextField label="Email" name="email" value={newFuncionario.email} onChange={handleNewFuncionarioChange} />
            <TextField label="Telefone" name="phone" value={newFuncionario.phone} onChange={handleNewFuncionarioChange} />
            <TextField label="ID do Departamento" name="department_id" value={newFuncionario.department_id} onChange={handleNewFuncionarioChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewFuncionarioDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleCreateFuncionario} color="primary">
              Criar
            </Button>
          </DialogActions>
        </Dialog>
        <div className='mt-5'></div>
      </div>
    );
  };

export default FuncionariosHome;
