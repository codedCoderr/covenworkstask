import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../../actions/auth';
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://codedcoder.com/'>
        codedcoder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({ login, history, loginAuth }) => {
  useEffect(() => {
    setFormData({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      loading: !1
    });
  }, [loginAuth.authData]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    loading: !1
  });
  const { username, password, loading } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            setFormData({ loading: !0 });
            login(username, password, history);
          }}
          className={classes.form}
          noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            onChange={e => onChange(e)}
            value={username}
            autoComplete='username'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            onChange={e => onChange(e)}
            value={password}
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          {loading ? (
            <Button
              disabled
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}></Button>
          ) : (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </Button>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  loginAuth: state.authError
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
