import { Link } from "@/core/components";
import { Typography } from "@mui/material";

const StoriesEmpty = () => {
  return (
    <>
      <Typography component={"h3"} variant={"h4"} align={"center"} mt={9}>
        Ya no hay más historias.
      </Typography>
      <Typography component={"h3"} variant={"h5"} align={"center"} mb={10}>
        ¡Ayuda a nuestra comunidad{" "}
        <Link href={"/story/add"} underline={"none"}>
          creando una historia!
        </Link>
      </Typography>
    </>
  );
};
export default StoriesEmpty;
