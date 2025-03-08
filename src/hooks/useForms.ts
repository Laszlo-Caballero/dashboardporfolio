import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

interface Props<T> {
  initialValues: T;
  validate?: (data: T) => Partial<T>;
  zodSchema?: ZodObject<ZodRawShape>;
}

export function useForm<T>({ initialValues, zodSchema, validate }: Props<T>) {
  const [values, setValues] = useState<T>(initialValues || ({} as T));
  const [errors, setErrors] = useState<Partial<T>>({});

  const register = (
    input: keyof T
  ): {
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
  } => {
    if (
      typeof values[input] != "object" &&
      typeof values[input] !== "boolean"
    ) {
      return {
        value: (values[input] as string | number) || "",
        onChange: (e) => {
          setValues((prev) => {
            return {
              ...prev,
              [input]: e.target.value,
            };
          });
        },
      };
    }

    if (typeof values[input] === "boolean") {
      return {
        checked: values[input],
        onChange(e) {
          setValues((prev) => {
            return {
              ...prev,
              [input]: e.target.checked,
            };
          });
        },
      };
    }

    return {};
  };

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const setValuesForm = (data: Partial<T>) => {
    setValues((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const reset = (data?: Partial<T>) => {
    setValues(data ? { ...values, ...data } : initialValues);
  };

  const handleSubmit = (cb: (submitValues: T) => void) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setErrors({});

      const errorsDataValidate = validate?.(values);

      if (errorsDataValidate && Object.keys(errorsDataValidate).length > 0) {
        setErrors(errorsDataValidate);
        return;
      }

      const errors = zodSchema?.safeParse(values);
      if (errors?.success === false) {
        errors.error.errors.forEach((error) => {
          setErrors((prev) => {
            const key = error.path[0] as keyof T;

            return {
              ...prev,
              [key]: error.path[1]
                ? { [error.path[1]]: error.message }
                : error.message,
            };
          });
        });

        return;
      }

      setErrors({});
      cb(values);
    };
  };

  return {
    values,
    errors,
    register,
    handleSubmit,
    setValue,
    setValuesForm,
    reset,
  };
}
