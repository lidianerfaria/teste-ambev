import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

import {
  useGetUsers,
  useUpdateUser,
  useDeleteUser,
  User,
} from '../services/userService';
import UserForm from '../components/UserForm';

export default function Home() {
  const { data: users, isLoading, isError } = useGetUsers();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [editUser, setEditUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleEdit = (user: User) => {
    setEditUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = () => {
    if (editUser) {
      updateUser.mutate(
        { id: editUser.id, name, email },
        {
          onSuccess: () => setEditUser(null),
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate(id);
  };

  if (isLoading) return <Typography>Carregando usuários...</Typography>;
  if (isError) return <Typography>Erro ao buscar usuários.</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Lista de Usuários
      </Typography>
      <UserForm />
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => handleEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    size='small'
                    onClick={() => handleDelete(user.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Nome'
            variant='outlined'
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label='E-mail'
            variant='outlined'
            margin='normal'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleUpdate} variant='contained' color='primary'>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
