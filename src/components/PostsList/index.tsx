import { Paper, Stack, Grid2 as Grid, Typography } from "@mui/material";
import moment from "moment";
import Avatar from "../Avatar";
import { TPost } from "../../utils/types";

export default function PostsList({ posts, onCommentClick }: TProps) {
  console.log({ posts });

  if (posts == undefined) return <></>;
  return (
    <Stack spacing={2}>
      {posts.map((p, i) => (
        <Grid container component={Paper} p={2} columns={20} key={i}>
          <Grid size={2} key={i}>
            <Avatar name={p.idUsuario.username} />
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography fontSize={13} fontWeight="bold">
              {p.idUsuario.username}
            </Typography>
            <Typography fontSize={10} color="grey">
              {new Date(p.postDate).toLocaleString()}
            </Typography>
          </Grid>
          <Grid size={20} mt={2}>
            <Typography component="h2" fontWeight="bold">
              {p.subject}
            </Typography>
          </Grid>
          <Grid size={20} mt={2}>
            {p.content}
          </Grid>
          <Grid size={20} mt={2}>
            <Typography fontSize={13} color="grey" textAlign="end" width="100%">
              1 comentario
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}

type TProps = {
  posts: TPost[];
  onCommentClick?: (post: TPost) => void;
};
