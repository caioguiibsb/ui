import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  GRAY_BG_UX,
  BLUE_THEME,
  BLACK_TABLE_THEME,
} from "../../shared/utils";
import "react-international-phone/style.css";
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";

function InputPhone(props) {
  const temaEscuro = useSelector(state => state.AuthReducer.temaEscuro);

  const { telefone, setTelefone } = props;

  const FilterCountries = useMemo(() => 
    defaultCountries.filter((country) => {
      const { iso2 } = parseCountry(country);
      return ["br", "pt"].includes(iso2);
    }), []
  );

  const countryNames = useMemo(() => ({
    br: "Brasil",
    pt: "Portugal",
  }), []);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "br",
    value: telefone,
    countries: FilterCountries,
    onChange: (data) => {
      setTelefone(data.phone);
    },
  });

  return (
    <TextField
      data-testid="phone-input"
      style={{ backgroundColor: temaEscuro ? BLUE_THEME : GRAY_BG_UX }}
      variant="outlined"
      label="Telefone"
      color="primary"
      placeholder="Telefone"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              data-testid="button-selector"
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: temaEscuro ? BLACK_TABLE_THEME : GRAY_BG_UX,
                  },
                },
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                fieldset: {
                  display: "none",
                },
                "&.Mui-focused:has(div[aria-expanded='false'])": {
                  fieldset: {
                    display: "block",
                  },
                },
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
            >
              {FilterCountries.map((c) => {
                const parsedCountry = parseCountry(c);
                return (
                  <MenuItem data-testid="menu-item" key={parsedCountry.iso2} value={parsedCountry.iso2}>
                    <FlagImage
                      iso2={parsedCountry.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    <Typography marginRight="8px">{countryNames[parsedCountry.iso2]}</Typography>
                    <Typography color="gray">+{parsedCountry.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputPhone;
