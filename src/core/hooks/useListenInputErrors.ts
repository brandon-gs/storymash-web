import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { IBaseQueryErrors, IValidationErrors } from "../services";

const useListenInputErrors = <ISchema extends FieldValues>(
  errors:
    | IBaseQueryErrors
    | IValidationErrors<ISchema>
    | SerializedError
    | undefined,
  setError: UseFormSetError<ISchema>
) => {
  useEffect(() => {
    if (errors === undefined) return;

    const hasData = "data" in errors;
    if (hasData && "validationErrors" in errors.data) {
      for (const currentError of errors.data.validationErrors) {
        if (currentError.path.length < 2) continue;

        const [type, fieldName] = currentError.path;
        if (type !== "body") return;

        setError(fieldName, { message: currentError.message });
        console.log(currentError);
      }
    }
  }, [errors, setError]);
};
export default useListenInputErrors;
