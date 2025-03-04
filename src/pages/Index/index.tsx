import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Post from "../../components/Post";
import PostsList from "../../components/PostsList";
import GroupItem from "../../components/GroupItem";
import useGeneralPosts from "../../hooks/useGeneralPosts";
import GroupServices from "../../services/GroupServices";
import useUser from "../../hooks/useUser";
import useMyGroups from "../../hooks/useMyGroups";
import useGroups from "../../hooks/useGroups";
import GroupsIcon from "@mui/icons-material/Groups";

export default function IndexPage() {
  const { user } = useUser();
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const { posts, reloadPosts } = useGeneralPosts();
  const myGroups = useMyGroups(user!.id);
  const allGroups = useGroups();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const handlePostCreated = () => reloadPosts();

  const handleCreateGroupClick = () => {
    setOpenCreateGroupModal(true);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const createGroupRes = await GroupServices.createGroup(
      data.name,
      data.description,
      +user!.id
    );
    if (!createGroupRes.success) {
      toast(createGroupRes.message, {
        type: "error",
      });
      return;
    }

    toast("Grupo creado correctamente", {
      type: "success",
    });
    reset({
      name: "",
      description: "",
    });
    setOpenCreateGroupModal(false);
    myGroups.reloadGroups();
  };

  const handleJoinGroup = async (groupId: number) => {
    await GroupServices.joinGroup(user!.id, groupId);
    myGroups.reloadGroups();
    allGroups.reloadGroups();
    toast("Te has unido al grupo exitosamente", {
      type: "success",
    });
  };

  return (
    <Grid container spacing={10} columns={20}>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Todos los grupos
        </Typography>
        <Stack spacing={2}>
          {allGroups.groups
            .filter(
              (g) => myGroups.groups.findIndex((mg) => mg.id == g.id) == -1
            )
            .map((g, i) => (
              <Box
                key={i}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  color: "#000",
                  display: "flex",
                  gap: 1,
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
                display="flex"
                alignItems="center"
              >
                <GroupsIcon />
                <Typography>Hola</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleJoinGroup(g.id)}
                >
                  Unirme al grupo
                </Button>
              </Box>
            ))}
        </Stack>
      </Grid>
      <Grid size={8}>
        <Post onPostCreated={handlePostCreated} />
        <Divider sx={{ my: 2 }} />
        <PostsList posts={posts} />
      </Grid>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Tus grupos
        </Typography>
        <Stack spacing={2}>
          {myGroups.groups.map((g, i) => (
            <GroupItem key={i} name={g.name} id={g.id} />
          ))}
          <Button variant="contained" onClick={handleCreateGroupClick}>
            Crear grupo
          </Button>
        </Stack>
      </Grid>
      <Modal
        open={openCreateGroupModal}
        onClose={() => setOpenCreateGroupModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Crear grupo
          </Typography>
          <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              placeholder="Nombre"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              fullWidth
              placeholder="Descripción"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Crear
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
}

const Schema = yup.object({
  name: yup.string().required("Campo obligatorio"),
  description: yup.string().required("Campo obligatorio"),
});

type FormFields = yup.InferType<typeof Schema>;
