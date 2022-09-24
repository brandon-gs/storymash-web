import { CheckCircle } from "@mui/icons-material";
import { Avatar, Paper, Typography } from "@mui/material";
import { FC } from "react";

const defaultImageUrl = process.env.NEXT_PUBLIC_GENDER_MALE_IMAGE;

interface IOnboardingSelectGender {
  label?: string;
  imageUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const OnboardingSelectGender: FC<IOnboardingSelectGender> = ({
  label = "",
  imageUrl = defaultImageUrl,
  isSelected = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <>
      <Paper
        elevation={4}
        onClick={handleClick}
        role="button"
        sx={[
          {
            position: "relative",
            width: 104,
            height: 128,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
            cursor: "pointer",
            transition: "background .2s",
            userSelect: "none",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          },
          isSelected && {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        ]}
      >
        <Avatar
          alt={`Seleccionar ${label}`}
          src={imageUrl}
          sx={{
            width: 80,
            height: 80,
          }}
        />
        <Typography component="p" variant="subtitle1">
          {label}
        </Typography>
        {isSelected && (
          <CheckCircle
            color="success"
            sx={{
              fontSize: 32,
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "100%",
              bottom: -24,
            }}
          />
        )}
      </Paper>
    </>
  );
};
export default OnboardingSelectGender;
