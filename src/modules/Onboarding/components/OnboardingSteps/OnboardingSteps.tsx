import { QontoConnector, QontoStepIcon } from "@/core/components";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";

interface IOnboardingStepsProps {
  activeStep: 0 | 1 | 2;
}

const OnboardingSteps: FC<IOnboardingStepsProps> = ({ activeStep }) => {
  return (
    <Stack sx={{ width: "100%", pt: 4 }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {["Personal", "Género", "Perfil"].map((label) => {
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
};
export default OnboardingSteps;
