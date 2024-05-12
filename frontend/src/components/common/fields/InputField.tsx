import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import React, {
  ReactNode,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import { useFormContext } from "react-hook-form";
import getFieldError from "@utils/getFieldError";
import firstCharDetector from "@/utils/firstCharDetector";

const InputField = () => {
  return <TextField />;
};

interface IInputFieldUCProps extends Omit<OutlinedTextFieldProps, "variant"> {
  name: string;
  minLength?: number;
  isFocused?: boolean;
  pallet?: any;
}

const InputFieldUC = (props: IInputFieldUCProps) => {
  const {
    name,
    required,
    InputLabelProps,
    type,
    minLength,
    helperText,
    isFocused,
    pallet,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPassword, toggleShowPassword] = usePasswordFieldAdornment();
  const { hasError, errorMessage } = getFieldError(errors, name, minLength);
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef?.current?.focus(); // Focus the input if isFocused prop is true
    }
  }, [isFocused]);
  useEffect(() => {
    if (inputRef.current && isFocused) {
      const inputValue = inputRef.current?.value;
      const isFarsi = firstCharDetector(inputValue);
      inputRef.current.style.direction = isFarsi ? "rtl" : "ltr";
      inputRef.current.style.fontFamily = isFarsi ? "VazirMatn" : "Roboto";
      inputRef?.current?.focus();
    }
  }, [inputRef.current?.value]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type !== "password") {
      const isFarsi = firstCharDetector(event.target.value);
      event.target.dir = isFarsi ? "rtl" : "ltr";
      event.target.style.fontFamily = isFarsi ? "VazirMatn" : "Roboto";
    }
    if (type === "password" && inputRef.current) {
      inputRef?.current?.focus();
    }
  };

  return (
    <TextField
      {...rest}
      {...register(name, { required, minLength })}
      type={showPassword ? "text" : type}
      fullWidth
      size="small"
      variant="outlined"
      inputRef={inputRef}
      onChange={handleInputChange}
      sx={{
        background: pallet?.background,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: pallet?.borderColor,
          },
          "&:hover fieldset": {
            borderColor: pallet?.borderHover,
          },
          "&.Mui-focused fieldset": {
            borderColor: pallet?.borderColor,
          },
        },
      }}
      InputLabelProps={{ ...InputLabelProps, required }}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment
                  sx={{ cursor: "pointer" }}
                  position="end"
                  onClick={toggleShowPassword}
                  onMouseDown={(e: any) => {
                    e.preventDefault();
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }
          : {}
      }
      error={hasError}
      helperText={(errorMessage as ReactNode) || helperText}
    />
  );
};

export const usePasswordFieldAdornment: () => [boolean, () => void] = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  return [showPassword, toggleShowPassword];
};

export { InputFieldUC, InputField };
