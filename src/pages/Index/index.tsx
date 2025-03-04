import { Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import Post from "../../components/Post";
import PostsList from "../../components/PostsList";
import GroupItem from "../../components/GroupItem";

export default function IndexPage() {
  return (
    <Grid container spacing={10} columns={20}>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Grupos en los que estás
        </Typography>
        <Stack spacing={2}>
          <GroupItem name="Grupo 1" id={1} />
          <GroupItem name="Grupo 2" id={2} />
        </Stack>
      </Grid>
      <Grid size={8}>
        <Post />
        <Divider sx={{ my: 2 }} />
        <PostsList />
      </Grid>
      <Grid size={6}>
        <Typography fontWeight="bold" mb={2}>
          Grupos en los que moderas
        </Typography>
        <Stack spacing={2}>
          <GroupItem name="Grupo 1" id={1} />
          <GroupItem name="Grupo 2" id={2} />
        </Stack>
      </Grid>
    </Grid>
  );
}
