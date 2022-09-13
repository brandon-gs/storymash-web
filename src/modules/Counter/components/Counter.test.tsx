import { screen } from "@testing-library/react";
import { render } from "@/test/test-utils";
import user from "@testing-library/user-event";

jest.mock("./counterApi", () => ({
  fetchCount: (amount: number) =>
    new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    ),
}));

import { Counter } from "@/modules/Counter/components";

describe("<Counter />", () => {
  it("renders the component", () => {
    render(<Counter />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("decrements the value", async () => {
    render(<Counter />);

    await user.click(screen.getByRole("button", { name: /decrement value/i }));

    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  it("increments the value", async () => {
    render(<Counter />);

    const spanCounter = screen.getByTestId(/counter/i);
    const currentValue = parseInt(spanCounter.textContent ?? "0");
    const nextValue = (currentValue + 1).toString();

    await user.click(screen.getByRole("button", { name: /increment value/i }));

    expect(screen.getByText(nextValue)).toBeInTheDocument();
  });

  it("increments by amount", async () => {
    render(<Counter />);

    await user.type(
      screen.getByLabelText(/set increment amount/i),
      "{backspace}5"
    );

    const inputAmount =
      screen.getByLabelText<HTMLInputElement>(/set increment amount/i);
    const inputValue = parseInt(inputAmount.value);
    const spanCounter = screen.getByTestId(/counter/i);
    const currentValue = parseInt(spanCounter.textContent ?? "0");

    await user.click(screen.getByRole("button", { name: /add amount/i }));

    const nextValue = (currentValue + inputValue).toString();

    expect(screen.getByText(nextValue)).toBeInTheDocument();
  });

  it("increments async", async () => {
    render(<Counter />);

    await user.type(
      screen.getByLabelText(/set increment amount/i),
      "{backspace}3"
    );

    const inputAmount =
      screen.getByLabelText<HTMLInputElement>(/set increment amount/i);
    const inputValue = parseInt(inputAmount.value);
    const spanCounter = screen.getByTestId(/counter/i);
    const currentValue = parseInt(spanCounter.textContent ?? "0");

    await user.click(screen.getByRole("button", { name: /add async/i }));

    const nextValue = (currentValue + inputValue).toString();

    await expect(screen.findByText(nextValue)).resolves.toBeInTheDocument();
  });

  it("increments if amount is odd", async () => {
    render(<Counter />);

    const spanCounter = screen.getByTestId(/counter/i);
    let currentValue = parseInt(spanCounter.textContent ?? "0");

    await user.click(screen.getByRole("button", { name: /add if odd/i }));

    expect(screen.getByText(currentValue.toString())).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increment value/i }));
    // also increment currentValue by 1
    currentValue += 1;

    await user.type(
      screen.getByLabelText(/set increment amount/i),
      "{backspace}8"
    );
    await user.click(screen.getByRole("button", { name: /add if odd/i }));

    const inputAmount =
      screen.getByLabelText<HTMLInputElement>(/set increment amount/i);
    const inputValue = parseInt(inputAmount.value);
    const nextValue = (currentValue + inputValue).toString();

    await expect(screen.findByText(nextValue)).resolves.toBeInTheDocument();
  });
});
