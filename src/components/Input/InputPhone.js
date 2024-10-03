import React, { useMemo } from "react"; // Importa React e o hook useMemo para otimizações de desempenho.
import { useSelector } from "react-redux"; // Importa o hook useSelector para acessar o estado do Redux.
import {
  GRAY_BG_UX, 
  BLUE_THEME, 
  BLACK_TABLE_THEME, 
} from "../../shared/utils"; // Importa cores e temas personalizados.

import "react-international-phone/style.css"; // Importa os estilos necessários para a biblioteca react-international-phone.
import {
  InputAdornment, // Adorno para adicionar elementos dentro de campos de input.
  MenuItem, // Componente do Material UI para itens de menu.
  Select, // Componente Select para criar um dropdown.
  TextField, // Componente de campo de texto (input) do Material UI.
  Typography, // Componente para exibição de texto estilizado (Material UI).
} from "@mui/material"; // Importa componentes do Material UI.

import {
  defaultCountries, // Lista padrão de países para a seleção de telefone.
  FlagImage, // Componente para exibir a bandeira de um país.
  parseCountry, // Função que analisa e retorna informações de um país.
  usePhoneInput, // Hook para gerenciar o input de telefone.
} from "react-international-phone"; // Importa funções e hooks da biblioteca react-international-phone.

/**
 * Componente de Input de Telefone com seleção de país e formato internacional.
 * 
 * @param {object} props - Propriedades passadas ao componente.
 * @returns {JSX.Element} - Componente de input para telefone com seleção de país.
 */
function InputPhone(props) {
  // Utiliza o hook useSelector para pegar o valor do tema escuro do Redux.
  const temaEscuro = useSelector(state => state.AuthReducer.temaEscuro);

  const { telefone, setTelefone } = props; // Obtém as props de telefone e a função setTelefone.

  /**
   * Memoiza a lista de países, filtrando para mostrar apenas Brasil e Portugal.
   */
  const FilterCountries = useMemo(() => 
    defaultCountries.filter((country) => {
      const { iso2 } = parseCountry(country); // Analisa o país e obtém o código ISO.
      return ["br", "pt"].includes(iso2); // Filtra para incluir apenas Brasil e Portugal.
    }), []
  );

  /**
   * Mapeia os nomes dos países para exibição customizada.
   */
  const countryNames = useMemo(() => ({
    br: "Brasil", 
    pt: "Portugal", 
  }), []);

  /**
   * Hook `usePhoneInput` para controlar o campo de telefone.
   * Define o país padrão como Brasil e define o formato e controle de valor do input.
   */
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "br", // Define Brasil como país padrão.
    value: telefone, // Valor do telefone vindo das props.
    countries: FilterCountries, // Usa a lista filtrada de países.
    onChange: (data) => {
      setTelefone(data.phone); // Atualiza o valor do telefone quando o usuário o altera.
    },
  });

  return (
    <TextField
      data-testid="phone-input" // Atributo para testes (usado em testes automatizados).
      style={{ backgroundColor: temaEscuro ? BLUE_THEME : GRAY_BG_UX }} // Aplica o tema escuro ou claro conforme o estado.
      variant="outlined" // Define o estilo de input com borda destacada.
      label="Telefone" // Rótulo do campo de telefone.
      color="primary" // Define a cor principal do campo.
      placeholder="Telefone" // Placeholder para o input.
      value={inputValue} // Valor do input de telefone.
      onChange={handlePhoneValueChange} // Função que manipula mudanças no valor do telefone.
      type="tel" // Define o tipo de input como "tel" (telefone).
      inputRef={inputRef} // Referência para o input.
      InputProps={{
        startAdornment: (
          // Adorna o início do campo com um Select para seleção do país.
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              data-testid="button-selector" // Atributo para testes.
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
              value={country.iso2} // Valor do Select, baseado no código ISO do país.
              onChange={(e) => setCountry(e.target.value)} // Atualiza o país quando o usuário seleciona outro.
              renderValue={(value) => (
                // Exibe a bandeira do país selecionado.
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
            >
              {FilterCountries.map((c) => {
                const parsedCountry = parseCountry(c); // Analisa o país para obter informações detalhadas.
                return (
                  // Cria um item de menu para cada país na lista filtrada.
                  <MenuItem data-testid="menu-item" key={parsedCountry.iso2} value={parsedCountry.iso2}>
                    <FlagImage
                      iso2={parsedCountry.iso2} // Exibe a bandeira do país.
                      style={{ marginRight: "8px" }}
                    />
                    <Typography marginRight="8px">{countryNames[parsedCountry.iso2]}</Typography> {/* Exibe o nome do país. */}
                    <Typography color="gray">+{parsedCountry.dialCode}</Typography> {/* Exibe o código do país. */}
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

export default InputPhone; // Exporta o componente como padrão.
