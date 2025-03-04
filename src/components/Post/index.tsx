import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, Grid2 as Grid, TextField, Button, Stack } from "@mui/material";
import * as yup from "yup";
import Avatar from "../Avatar";
import COLORS from "../../utils/colors";
import useUser from "../../hooks/useUser";
import PostServices from "../../services/PostServices";
import { POST_STATE } from "../../utils/enums";
import { toast } from "react-toastify";

export default function Post({ idGroup, onPostCreated }: TProps) {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onPublish: SubmitHandler<FormFields> = async ({ subject, content }) => {
    const body = {
      idUsuario: user!.id,
      idGroup,
      subject,
      content,
      state: POST_STATE.SENT,
    };
    const createPostResponse = await PostServices.createPost(body);

    if (!createPostResponse.success) {
      toast(createPostResponse.message, {
        type: "error",
      });
      return;
    }

    if (onPostCreated) onPostCreated();
    toast("Publicación creada exitosamente", {
      type: "success",
    });
    reset({
      content: "",
      subject: "",
    });
  };

  return (
    <Grid container spacing={2} columns={12} sx={{ p: 2 }} component={Paper}>
      <Grid size={2}>
        <Avatar name="Diego José Saravia" />
      </Grid>
      <Grid size={10}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Tema de la publicación"
            {...register("subject")}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Escribe tu publicación aquí"
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: COLORS.WARM_ORANGE }}
          onClick={handleSubmit(onPublish)}
          disabled={isSubmitting || isValidating}
        >
          Publicar
        </Button>
      </Grid>
    </Grid>
  );
}

const Schema = yup.object({
  subject: yup.string().required("Campo obligatorio"),
  content: yup.string().required("Campo obligatorio"),
});

type FormFields = yup.InferType<typeof Schema>;

type TProps = {
  idGroup?: number;
  onPostCreated?: () => void;
};
