import React from "react";
import styled from "@emotion/styled";

export default function TemperatureConverter() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if its not a number return
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setInput(e.target.value);
    setTemperature(Number(e.target.value));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(e.target.value);
  };

  const convertToCelsius = (temperature: number) => {
    return roundToTwoPlaces(((temperature - 32) * 5) / 9);
  };

  const convertToFahrenheit = (temperature: number) => {
    return roundToTwoPlaces((temperature * 9) / 5 + 32);
  };

  const roundToTwoPlaces = (num: number) => {
    return Math.round(num * 100) / 100;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (scale === "c") {
      setTemperature(convertToCelsius(temperature));
      setIsConverted(true);
    } else if (scale === "f") {
      setTemperature(convertToFahrenheit(temperature));
      setIsConverted(true);
    }
    resetInput();
  };

  const resetInput = () => {
    setInput("");
  };

  const [temperature, setTemperature] = React.useState(0);
  const [scale, setScale] = React.useState("c");
  const [isConverted, setIsConverted] = React.useState(false);
  const [input, setInput] = React.useState("");

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
