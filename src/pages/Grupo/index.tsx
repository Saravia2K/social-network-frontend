import { useParams } from "react-router";
import { Button, Grid2 as Grid, Stack } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import Post from "../../components/Post";
import PostsList from "../../components/PostsList";
import useGroupPosts from "../../hooks/useGroupPosts";
import { basicFetch } from "../../utils/helpers";
import { API_URL } from "../../utils/consts";
import { toast } from "react-toastify";
import useGroups from "../../hooks/useGroups";
import GroupServices from "../../services/GroupServices";
import useGroupMembers from "../../hooks/useGroupMembers";
import { Box } from "@mui/system";
import useModerators from "../../hooks/useModeradores";
import useUser from "../../hooks/useUser";

export default function GrupoPage() {
  const params = useParams<{ id: string }>();
  const { user } = useUser();
  const { posts, reloadPosts } = useGroupPosts(+params!.id!);
  const { groups } = useGroups();
  const { users, reloadUsers } = useGroupMembers(+params.id!);
  const { moderators, reloadModerators } = useModerators(+params.id!);

  const handleDeleteFromGroup = async (id: number) => {
    const deleteUserResponse = await basicFetch(
      `${API_URL}/user-groups/${id}`,
      "DELETE",
      {}
    );
    if (!deleteUserResponse.success) {
      toast(deleteUserResponse.message, {
        type: "error",
      });
      return;
    }

    toast("Usuario eliminado con éxito", {
      type: "success",
    });
    reloadUsers();
    reloadModerators();
  };

  const handleDowngradeModerator = async (
    idModerator: number,
    idUser: number
  ) => {
    await basicFetch(`${API_URL}/moderators/${idModerator}`, "DELETE", {});
    await GroupServices.joinGroup(idUser, +params.id!);

    toast("Moderador degradado con éxito", {
      type: "success",
    });
    reloadUsers();
    reloadModerators();
  };

  const group = groups.find((g) => g.id == +params.id!);
  const IamModerator =
    (moderators ?? []).findIndex((m) => m.idUsuario.id == user?.id) > -1;
  return (
    <Grid container spacing={5} columns={20}>
      <Grid
        size={20}
        sx={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}
      >
        {group?.name}
      </Grid>
      <Grid size={20} sx={{ fontSize: 25, textAlign: "center" }}>
        {group?.description}
      </Grid>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Usuarios del grupo
        </Typography>
        <Stack spacing={2}>
          {(users ?? []).map((u) => (
            <Box
              key={u.id}
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
              <Typography>{u.idUsuario.username}</Typography>
              {IamModerator && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteFromGroup(u.id)}
                >
                  Sacar del grupo
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      </Grid>
      <Grid size={8}>
        <Post
          idGroup={+(params?.id || 0) || undefined}
          onPostCreated={() => reloadPosts()}
        />
        <Divider sx={{ my: 2 }} />
        <PostsList posts={posts} />
      </Grid>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Moderadores
        </Typography>
        <Stack spacing={2}>
          {(moderators ?? []).map((m) => (
            <Box
              key={m.id}
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
              <Typography>{m.idUsuario.username}</Typography>
              {IamModerator && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDowngradeModerator(m.id, m.idUsuario.id)}
                >
                  Degradar a miembro
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
