import { FC } from "react";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

interface ButtonBackProps {
  message: string;
  href: string;
  onClick?: Function;
}

const ButtonBack: FC<ButtonBackProps> = ({ message, href, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    onClick && onClick();
    router.push(href);
  };

  return (
    <Button startIcon={<ArrowBack />} onClick={handleClick}>
      <span>{message}</span>
    </Button>
  );
};
export default ButtonBack;
