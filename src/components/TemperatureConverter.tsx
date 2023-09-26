import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useTemperatureConverter } from "./useTemperatureConverter";
import { fetchData } from "../utils";

export default function TemperatureConverter() {
  const {
    handleChange,
    handleToggleChange,
    handleSubmit,
    temperature,
    scale,
    isConverted,
    input,
  } = useTemperatureConverter();

  useEffect(() => {
    fetchData("https://www.google.com");
  }, []);

  return (
    <StyledTemperatureContainer>
      <h1>Temperature Converter</h1>
      <StyledInput
        onChange={handleChange}
        type="text"
        placeholder="enter temperature"
        value={input}
      />
      <label htmlFor="fahrenheit">Celsius To Farenheit</label>
      <StyledCheckBox
        onChange={(e) => handleToggleChange(e)}
        type="checkbox"
        checked={scale === "f"}
        id="fahrenheit"
        value="f"
      />
      <label htmlFor="celsius">Farenheit to Celsius</label>
      <StyledCheckBox
        onChange={(e) => handleToggleChange(e)}
        type="checkbox"
        id="celsius"
        value="c"
        checked={scale === "c"}
      />
      <button disabled={input === ""} onClick={(e) => handleSubmit(e)}>
        Convert
      </button>
      <p>{isConverted && `${temperature} ${scale}`}</p>
    </StyledTemperatureContainer>
  );
}

const StyledTemperatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  width: 200px;
`;

const StyledCheckBox = styled.input`
  margin: 10px;
`;
