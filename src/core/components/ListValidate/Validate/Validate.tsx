import { Chip, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

export interface IValidateProps {
  isValid?: boolean;
  label: string;
}

const Validate: FC<IValidateProps> = ({ isValid = false, label }) => {
  return (
    <Stack spacing={1} direction="row">
      <Chip
        icon={
          <Box
            sx={[
              {
                bgcolor: "error.light",
                height: 8,
                width: 8,
                borderRadius: 1,
              },
              isValid && { bgcolor: "success.light" },
            ]}
          />
        }
        label={label}
        size="small"
        sx={{ background: "transparent", "&.MuiChip-icon": { ml: 8 } }}
      />
    </Stack>
  );
};
export default Validate;
