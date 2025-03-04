import GroupsIcon from "@mui/icons-material/Groups";
import { Box, SxProps, Typography } from "@mui/material";
import { Link } from "react-router";

export default function GroupItem({ name, id }: TProps) {
  return (
    <Box component={Link} to={`/grupo/${id}`} sx={BoxStyles}>
      <GroupsIcon />
      <Typography>{name}</Typography>
    </Box>
  );
}

const BoxStyles: SxProps = {
  cursor: "pointer",
  p: 2,
  borderRadius: 2,
  color: "#000",
  display: "flex",
  gap: 1,
  "&:hover": {
    bgcolor: "#fff",
  },
};

type TProps = {
  id: number;
  name: string;
};
