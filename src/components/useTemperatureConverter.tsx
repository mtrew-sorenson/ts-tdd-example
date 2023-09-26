import React from "react";

export const useTemperatureConverter = () => {
  const [temperature, setTemperature] = React.useState(0);
  const [scale, setScale] = React.useState("c");
  const [isConverted, setIsConverted] = React.useState(false);
  const [input, setInput] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    handleChange,
    handleToggleChange,
    handleSubmit,
    temperature,
    scale,
    isConverted,
    input,
    setTemperature,
    setIsConverted,
    convertToCelsius,
    convertToFahrenheit,
    roundToTwoPlaces,
  };
};
