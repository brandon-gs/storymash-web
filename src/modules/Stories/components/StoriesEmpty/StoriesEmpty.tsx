import { Link } from "@/core/components";
import { Box, Typography } from "@mui/material";

const StoriesEmpty = () => {
  return (
    <Box pb={2}>
      <Typography component={"h3"} variant={"h4"} align={"center"} mt={9}>
        Ya no hay más historias.
      </Typography>
      <Typography component={"h3"} variant={"h5"} align={"center"} mb={10}>
        ¡Ayuda a nuestra comunidad{" "}
        <Link href={"/stories/create"} underline={"none"}>
          creando una historia!
        </Link>
      </Typography>
    </Box>
  );
};
export default StoriesEmpty;
