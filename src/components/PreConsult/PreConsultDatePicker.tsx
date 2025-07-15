import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface PreConsultDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

const PreConsultDatePicker: React.FC<PreConsultDatePickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const dateValue = value
    ? (() => {
        const [d, m, y] = value.split("/");
        return new Date(Number(y), Number(m) - 1, Number(d));
      })()
    : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={dateValue}
        onChange={(date) => {
          if (date) {
            const formatted = `${date.getDate().toString().padStart(2, "0")}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${date.getFullYear()}`;
            onChange(formatted);
          }
        }}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            sx: { borderRadius: 5 },
          },
        }}
        maxDate={new Date()}
      />
    </LocalizationProvider>
  );
};

export default PreConsultDatePicker;
