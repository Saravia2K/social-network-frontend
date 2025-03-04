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
import COLORS from "../../utils/colors";
import UserServices from "../../services/UserServices";

import bg from "../../assets/images/register.jpg";

export default function RegistroPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    try {
      const registerResponse = await UserServices.register(formData);
      if (!registerResponse.success) throw new Error(registerResponse.message);

      toast("Ahora inicia sesión para entrar a nuestra red social", {
        type: "success",
      });
      navigate("/login");
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
      <Grid size={6} overflow="hidden" height="100%">
        <img src={bg} />
      </Grid>
      <Grid
        size={6}
        bgcolor={COLORS.SOFT_PURPLE}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            borderTop: `20px solid ${COLORS.VIBRANT_GREEN}`,
            width: "400px",
          }}
        >
          <Typography
            component="h1"
            borderLeft={`7.5px solid ${COLORS.VIBRANT_GREEN}`}
            color={COLORS.VIBRANT_GREEN}
            mt={5}
            px={5}
            fontSize={30}
          >
            Registro
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
              placeholder="Email"
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...register("email")}
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
              sx={{ bgcolor: COLORS.VIBRANT_GREEN }}
              disabled={isValidating || isSubmitting}
            >
              Registrarse
            </Button>
            <Link
              to="/login"
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "grey",
                textDecoration: "underline",
              }}
            >
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

const FormSchema = yup.object({
  username: yup.string().required("Este campo es obligatorio"),
  email: yup
    .string()
    .email("Ingresa un email válido")
    .required("Este campo es obligatorio"),
  password: yup.string().required("Este campo es obligatorio"),
});

type FormFields = {
  username: string;
  email: string;
  password: string;
};
