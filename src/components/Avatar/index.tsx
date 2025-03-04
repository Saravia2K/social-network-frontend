import { Avatar as MUIAvatar } from "@mui/material";

export default function Avatar({ name, src }: Props) {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name?: string) {
    if (!name) return {};

    const nameSplitted = name.split(" ");
    const firstName = nameSplitted[0];
    const secondName = nameSplitted[1];
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${getNameLetter(firstName)}${getNameLetter(secondName)}`,
    };
  }

  function getNameLetter(name?: string) {
    return name ? name[0].toUpperCase() : "";
  }

  return src ? <MUIAvatar src={src} /> : <MUIAvatar {...stringAvatar(name)} />;
}

type Props = {
  name?: string;
  src?: string;
};
