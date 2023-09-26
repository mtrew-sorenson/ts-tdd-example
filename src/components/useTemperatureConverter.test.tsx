import { renderHook, act } from "@testing-library/react-hooks";
import { useTemperatureConverter } from "./useTemperatureConverter";
import { ChangeEvent } from "react";

test("it converts temperatures correctly", () => {
  const { result } = renderHook(() => useTemperatureConverter());
  const spy = jest.spyOn(result.current, "handleChange");
  act(() => {
    result.current.handleChange({
      target: { value: "32" },
    } as ChangeEvent<HTMLInputElement>);
  });
  expect(result.current.temperature).toBe(32);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({
    target: { value: "32" },
  });

  act(() => {
    result.current.handleToggleChange({
      target: { value: "f" },
    } as ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.scale).toBe("f");

  act(() => {
    result.current.handleSubmit({ preventDefault: jest.fn() } as any);
  });
  expect(result.current.temperature).toBe(89.6);
});
