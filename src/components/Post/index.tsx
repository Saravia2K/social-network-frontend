import { useState } from "react";
import { Paper, Grid2 as Grid, TextField, Button } from "@mui/material";

import Avatar from "../Avatar";
import COLORS from "../../utils/colors";

export default function Post() {
  const [post, setPost] = useState("");

  const handlePublish = () => {
    alert(post);
  };

  return (
    <Grid container spacing={2} columns={12} sx={{ p: 2 }} component={Paper}>
      <Grid size={2}>
        <Avatar name="Diego José Saravia" />
      </Grid>
      <Grid size={10}>
        <TextField
          fullWidth
          multiline
          value={post}
          placeholder="Escribe tu publicación aquí"
          onChange={(e) => setPost(e.target.value)}
        />
      </Grid>
      <Grid size={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: COLORS.WARM_ORANGE }}
          onClick={handlePublish}
        >
          Publicar
        </Button>
      </Grid>
    </Grid>
  );
}
