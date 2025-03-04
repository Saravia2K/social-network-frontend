import { Paper, Stack, Grid2 as Grid, Typography } from "@mui/material";
import Avatar from "../Avatar";

export default function PostsList() {
  return (
    <Stack spacing={2}>
      <Grid container component={Paper} p={2} columns={20}>
        <Grid size={2}>
          <Avatar name="Jeansy Sandoval" />
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography fontSize={13} fontWeight="bold">
            Diego José Saravia
          </Typography>
          <Typography fontSize={10} color="grey">
            2 de marzo de 2025 a las 20:40
          </Typography>
        </Grid>
        <Grid size={20} mt={2}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
          esse, modi est distinctio beatae dolore a dicta, nihil molestias
          repudiandae rerum vel tempore quae, deserunt veritatis nulla. Ab,
          atque architecto ducimus veritatis saepe hic maxime nemo reprehenderit
          optio obcaecati laudantium quasi necessitatibus odio molestiae omnis
          voluptatibus vero at quibusdam eum similique iure beatae! Optio
          aspernatur maiores ullam voluptates quibusdam exercitationem quisquam
          sed, dolor, quas quo voluptate consectetur ut quos aliquid illum
          numquam, dolores atque sapiente sunt odit consequatur vero. Ab,
          voluptates deserunt! Architecto cupiditate, voluptates sequi labore
          modi, in, similique neque tempora distinctio aliquam rem. Quia
          architecto sit voluptates! Mollitia.
        </Grid>
        <Grid size={20} mt={2}>
          <Typography fontSize={13} color="grey" textAlign="end" width="100%">
            1 comentario
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
