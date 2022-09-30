import { UserGender } from "@/core/interfaces";
import { type ChangeEvent, useMemo, useState } from "react";

const useOnboardingGender = () => {
  const [gender, setGender] = useState<string>("");
  const [customGender, setCustomGender] = useState<string>("");

  const handleSelectGender = (selectedGender: string) => () => {
    setGender(selectedGender);
  };

  const handleChangeCustomGender = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCustomGender(value.replace(/[^a-z]/gi, ""));
  };

  const disableButton = useMemo(() => {
    if (gender === UserGender.male || gender === UserGender.female) {
      return false;
    }
    if (gender === UserGender.other && customGender !== "") {
      return false;
    }
    return true;
  }, [gender, customGender]);

  return {
    disableButton,
    gender,
    customGender,
    handleSelectGender,
    handleChangeCustomGender,
  };
};
export default useOnboardingGender;
