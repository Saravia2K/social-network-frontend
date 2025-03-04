import { Link, useNavigate } from "react-router";
import {
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";
import COLORS from "../../utils/colors";
import UserServices from "../../services/UserServices";

import bg from "../../assets/images/login.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    try {
      const { username, password } = formData;
      const registerResponse = await UserServices.login(username, password);
      if (!registerResponse.success) throw new Error(registerResponse.message);

      setUser(registerResponse.user);
      navigate("/");
    } catch (error) {
      console.log(`Error trying to register: ${error}`);
      if (error instanceof Error)
        toast(error.message, {
          type: "error",
        });
    }
  };

  return (
    <Grid container width="100%" height="100vh">
      <Grid
        size={6}
        bgcolor={COLORS.SOFT_GREY}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            borderTop: `20px solid ${COLORS.SOFT_PURPLE}`,
            width: "400px",
          }}
        >
          <Typography
            component="h1"
            borderLeft={`7.5px solid ${COLORS.SOFT_PURPLE}`}
            color={COLORS.SOFT_PURPLE}
            mt={5}
            px={5}
            fontSize={30}
          >
            Iniciar Sesión
          </Typography>
          <Stack spacing={2} p={5}>
            <TextField
              fullWidth
              placeholder="Nombre de usuario"
              label="Nombre de usuario"
              error={!!errors.username?.message}
              helperText={errors.username?.message}
              {...register("username")}
            />
            <TextField
              fullWidth
              placeholder="Contraseña"
              label="Contraseña"
              type="password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: COLORS.SOFT_PURPLE }}
              disabled={isValidating || isSubmitting}
            >
              Iniciar Sesión
            </Button>
            <Link
              to="/registro"
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "grey",
                textDecoration: "underline",
              }}
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={6} overflow="hidden" height="100%">
        <img src={bg} />
      </Grid>
    </Grid>
  );
}

const FormSchema = yup.object({
  username: yup.string().required("Este campo es obligatorio"),
  password: yup.string().required("Este campo es obligatorio"),
});

type FormFields = yup.InferType<typeof FormSchema>;
