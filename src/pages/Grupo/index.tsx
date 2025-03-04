import { useParams } from "react-router";
import { Grid2 as Grid, Stack } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import GroupItem from "../../components/GroupItem";
import Post from "../../components/Post";
import PostsList from "../../components/PostsList";
import useGroupPosts from "../../hooks/useGroupPosts";

export default function GrupoPage() {
  const params = useParams<{ id: string }>();
  const { posts, reloadPosts } = useGroupPosts(+params!.id!);

  return (
    <Grid container spacing={10} columns={20}>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Usuarios del grupo
        </Typography>
        <Stack spacing={2}>
          <GroupItem name="Grupo 1" id={1} />
          <GroupItem name="Grupo 2" id={2} />
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
          <GroupItem name="Grupo 1" id={1} />
          <GroupItem name="Grupo 2" id={2} />
        </Stack>
      </Grid>
    </Grid>
  );
}
