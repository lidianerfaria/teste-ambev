import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useCreateUser } from '../services/userService';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const createUser = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    createUser.mutate(
      { name, email },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
        },
        onError: () => {
          setError('Erro ao adicionar usuário. Tente novamente.');
        },
      }
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '20px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant='h6' align='center' gutterBottom>
        Adicionar Usuário
      </Typography>
      {error && (
        <Typography variant='body2' color='error' align='center'>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
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
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
          disabled={createUser.isPending}
        >
          {createUser.isPending ? <CircularProgress size={24} /> : 'Adicionar'}
        </Button>
      </form>
    </Box>
  );
}
