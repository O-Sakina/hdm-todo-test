/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import {
  Box, Button, Container, IconButton, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTask, setNewTask ] = useState<string>('');

  //  Fonction pour récupérer les taches
  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  // Fonction pour supprimer une tache
  const handleDelete = async (id: number) => {
    await api.delete(`/task/${id}`);
    await handleFetchTasks();
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
  };
  // Fonction pour sauvegarde une nouvelle tache
  const handleSave = async () => {
    if (newTask.trim()) {
      const response = await api.post('/tasks', { name: newTask });

      if (response) {
        const createdTask: Task = {
          id: response.id,
          name: response.name,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        setTasks([ ...tasks, createdTask ]);
        setNewTask(''); // Réinitialise le champ de saisie
        await handleFetchTasks(); // Recharge la liste des tâches
      } else {
        console.error("Erreur lors de l'ajout de la tâche");
      }
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
              <TextField size="small" value={task.name} fullWidth sx={{ maxWidth: 350 }} disabled />
              <Box>
                <IconButton color="success" disabled>
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center">
            Aucune tâche disponible
          </Typography>
        )}
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TextField
          size="small"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)} // Mise à jour de l'état newTask
          placeholder="Nouvelle tâche"
          sx={{ maxWidth: 250 }}
        />
        <Button variant="outlined" onClick={handleSave} sx={{ ml: 2 }}>
          Ajouter une tâche
        </Button>
      </Box>
    </Container>
  );
};

export default TodoPage;
