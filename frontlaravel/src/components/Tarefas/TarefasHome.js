import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CardActions, Alert } from '@mui/material';
import axios from 'axios';

const TarefasHome = () => {
  const [tarefas, setTarefas] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newTarefaDialogOpen, setNewTarefaDialogOpen] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [editingTarefa, setEditingTarefa] = useState(null);
  const [newTarefa, setNewTarefa] = useState({
    title: '',
    description: '',
    assignee_id: '',
    due_date: null,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch all tasks from the API
  const fetchTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to fetch all employees from the API
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Function to create a new task in the API
  const createTarefa = async () => {
    try {
      await axios.post('http://localhost:8000/api/tarefas', newTarefa);
      fetchTarefas(); // Update the list of tasks after creating a new one
      setNewTarefaDialogOpen(false); // Close the dialog
      setNewTarefa({
        title: '',
        description: '',
        assignee_id: '',
        due_date: null,
      });
      setSuccessMessage('Tarefa criada com sucesso!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage('Erro ao criar a tarefa. Por favor, tente novamente.');
      setSuccessMessage('');
    }
  };

  // Function to update an existing task in the API
  const updateTarefa = async (tarefa) => {
    try {
      await axios.put(`http://localhost:8000/api/tarefas/${tarefa.id}`, tarefa);
      setTarefas(tarefas.map((t) => (t.id === tarefa.id ? tarefa : t)));
      setEditDialogOpen(false);
      setEditingTarefa(null);
      setSuccessMessage('Tarefa atualizada com sucesso!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating task:', error);
      setErrorMessage('Erro ao atualizar a tarefa. Por favor, tente novamente.');
      setSuccessMessage('');
    }
  };

  // Function to delete a task in the API
  const deleteTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tarefas/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));
      setDeleteDialogOpen(false);
      setEditingTarefa(null);
      setSuccessMessage('Tarefa deletada com sucesso!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrorMessage('Erro ao deletar a tarefa. Por favor, tente novamente.');
      setSuccessMessage('');
    }
  };

  // Function to open the delete confirmation dialog
  const handleDeleteClick = (tarefa) => {
    setDeleteDialogOpen(true);
    setEditingTarefa(tarefa);
  };

  // Function to open the edit dialog
  const handleEditClick = (tarefa) => {
    setEditDialogOpen(true);
    setEditingTarefa({
      ...tarefa,
      assignee_name: getAssigneeName(tarefa.assignee_id),
    });
  };

  const getAssigneeName = (assigneeId) => {
    const funcionario = funcionarios.find((f) => f.id === assigneeId);
    return funcionario ? `${funcionario.firstName} ${funcionario.lastName}` : '';
  };

  // Function to open the new tarefa dialog
  const handleNewTarefaClick = () => {
    setNewTarefaDialogOpen(true);
  };

  // Function to close the delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setEditingTarefa(null);
  };

  // Function to close the edit dialog
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingTarefa(null);
  };

  // Function to close the new tarefa dialog
  const handleNewTarefaDialogClose = () => {
    setNewTarefaDialogOpen(false);
  };

  // Function to handle changes in the new tarefa input fields
  const handleNewTarefaChange = (e) => {
    setNewTarefa({
      ...newTarefa,
      [e.target.name]: e.target.value,
    });
  };

  // Function to create a new tarefa when the user clicks the "Criar" button in the new tarefa dialog
  const handleCreateTarefa = async () => {
    try {
      await createTarefa(newTarefa);
      fetchTarefas(); // Update the list of tasks after creating a new one
      handleNewTarefaDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update an existing tarefa when the user clicks the "Salvar" button in the edit dialog
  const handleUpdateTarefa = async () => {
    try {
      await updateTarefa(editingTarefa);
      handleEditDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete an existing tarefa when the user clicks the "Deletar" button in the delete confirmation dialog
  const handleDeleteTarefa = async () => {
    try {
      await deleteTarefa(editingTarefa.id);
      handleDeleteDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Call to fetch the tasks and employees when the component is mounted
  useEffect(() => {
    fetchTarefas();
    fetchFuncionarios();
  }, []);

  return (
    <div className='mx-5 mt-3'>
      {/* Flash messages */}
      {successMessage && <Alert className='mt-3' severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
      {errorMessage && <Alert className='mt-3' severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}

      <h2 className='mt-3'>Tarefas</h2>
      <Button variant="contained" color="primary" onClick={handleNewTarefaClick}>
        Novo
      </Button>

      {tarefas.map((tarefa) => (
        <div className="card mx-3 mt-3" key={tarefa.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{tarefa.title}</Typography>
              <Typography variant="body1">{tarefa.description}</Typography>
              <Typography variant="body2">Responsável ID: {tarefa.assignee_id}</Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={() => handleEditClick(tarefa)}>
                Editar
              </Button>
              <Button color="secondary" onClick={() => handleDeleteClick(tarefa)}>
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
          <Typography>Tem certeza que deseja deletar a tarefa?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTarefa} color="secondary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            name="title"
            value={editingTarefa ? editingTarefa.title : ''}
            onChange={handleNewTarefaChange}
          />
          <TextField
            label="Descrição"
            name="description"
            value={editingTarefa ? editingTarefa.description : ''}
            onChange={handleNewTarefaChange}
          />
          <TextField
            label="Responsável ID"
            name="assignee_id"
            value={editingTarefa ? editingTarefa.assignee_id : ''}
            onChange={handleNewTarefaChange}
            placeholder="ID do funcionário"
          />
          <TextField
            label="Responsável"
            value={editingTarefa ? editingTarefa.assignee_name : ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Data de Vencimento"
            name="due_date"
            value={editingTarefa ? editingTarefa.due_date : ''}
            onChange={handleNewTarefaChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateTarefa} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* New tarefa dialog */}
      <Dialog open={newTarefaDialogOpen} onClose={handleNewTarefaDialogClose}>
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogContent>
          <TextField label="Título" name="title" value={newTarefa.title} onChange={handleNewTarefaChange} />
          <TextField label="Descrição" name="description" value={newTarefa.description} onChange={handleNewTarefaChange} />
          <TextField label="Responsável ID" name="assignee_id" value={newTarefa.assignee_id} onChange={handleNewTarefaChange} placeholder='id do funcionário' />
          <TextField label="Data de Vencimento" name="due_date" value={newTarefa.due_date} onChange={handleNewTarefaChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewTarefaDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateTarefa} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
      <div className='mt-1'></div>
    </div>
  );
};

export default TarefasHome;
