import { FC } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

interface ButtonBackProps {
  message: string;
  href: string;
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
}

const ButtonBack: FC<ButtonBackProps> = ({
  message,
  href,
  onClick,
  isLoading = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClick && onClick();
    router.push(href);
  };

  return (
    <LoadingButton
      startIcon={<ArrowBack />}
      onClick={handleClick}
      loading={isLoading}
    >
      <span>{message}</span>
    </LoadingButton>
  );
};
export default ButtonBack;
