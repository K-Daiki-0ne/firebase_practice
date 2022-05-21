import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CssBaseline
}  from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LooksOutlined';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from  'firebase/auth';
import { updateUserProfile } from '../../store/userSlice';
import useStyle from './style';

export const Auth: React.FC = (): JSX.Element => {
  const [email, setEmail]       = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin]   = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');

  const classes = useStyle();
  const dispatch = useDispatch();

  const signInEmail = async (): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => console.error(err));
  }

  const signUpEmail = async (): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) => console.error(err));
      await updateProfile(auth.currentUser, {
        displayName: username,
      })

      dispatch(
        updateUserProfile({
          displayName: username
        })
      )
    } catch(e) {
      console.error(e);
    }    
  }

  const signInGoogle = async (): Promise<void> => {
    await signInWithPopup(auth, provider).catch((err) => console.error('error'))
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1652180690995-0a3ed0f6fafe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            { isLogin ? 'login' : 'register' }
          </Typography>
          <form  className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={
                isLogin
                  ? async ()=> {
                    try {
                      await signInEmail();
                    } catch(err) {
                      console.error(err);
                    }
                  }
                  : async () => {
                    try {
                      await signUpEmail();
                    } catch(err) {
                      console.error(err);
                    }
                  }
              }
            >
              { isLogin ? 'login' : 'register' }
            </Button>
            <Grid container>
              <Grid item xs>
                <span>パスワードをお忘れの方</span>
              </Grid>
              <Grid item>
                <span onClick={() => setIsLogin(!isLogin)}>
                  { isLogin ? 'アカウントを作成する' : 'ログインする' }
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signInGoogle}
            >
              Sign In With Google
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}
