import { fireEvent, render, screen } from "@testing-library/react";
import TemperatureConverter from "./TemperatureConverter";
import * as utils from "../utils";
import { act } from "react-dom/test-utils";

jest.mock("../utils");

beforeEach(() => {
  act(() => {
    jest.spyOn(utils, "fetchData").mockResolvedValue([{ temperature: 100 }]);
  });
});

test("renders input, radio buttons, and  convert button", () => {
  const spy = jest.spyOn(utils, "fetchData");
  render(<TemperatureConverter />);
  // first step
  expect(spy).toHaveBeenCalledTimes(1);
  const input = screen.getByPlaceholderText(/enter temperature/i);
  expect(input).toBeInTheDocument();
  // go over and add this in app.js
  const radioButtonF = screen.getByLabelText(/Celsius To Farenheit/i);
  expect(radioButtonF).toBeInTheDocument();

  const radioButtonC = screen.getByLabelText(/Farenheit to Celsius/i);
  expect(radioButtonC).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /convert/i });
  expect(button).toBeInTheDocument();
});

test("converts temperatures correctly", () => {
  render(<TemperatureConverter />);
  const input = screen.getByPlaceholderText(/enter temperature/i);
  fireEvent.change(input, { target: { value: "100" } });

  // select farhenheit
  const radioButtonF = screen.getByLabelText(/Farenheit to Celsius/i);
  fireEvent.click(radioButtonF);

  // click convert
  const button = screen.getByRole("button", { name: /convert/i });
  fireEvent.click(button);

  // check for correct result
  const result = screen.getByText(/37.78 c/i);
  expect(result).toBeInTheDocument();
});

test("fetches and displays local temperature", async () => {
  render(<TemperatureConverter />);
  const localTemp = await screen.findByText(/100/i);
  expect(localTemp).toBeInTheDocument();
});
