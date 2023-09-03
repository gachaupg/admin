import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormGroup, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../slices/authSlice";
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (e) => {
    dispatch(loginUser(user))
    console.log(user);
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
    <FormControl onSubmit={handleClick}>
    <Stack spacing={3}>
        <TextField           onChange={(e) => setUser({ ...user, email: e.target.value })}
 name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}

          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

     

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>

          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
          </LoadingButton>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}

    </FormControl>
      
    </>
  );
}
