import { fireEvent, render, vi } from "@/test/test-utils";
import { LabeledInput } from ".";

const mockOnChangeText = vi.fn();

describe("LabeledInput test", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <LabeledInput label="Label" value={""} onChangeText={mockOnChangeText} />
    );

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("should render with type money", () => {
    const { getByPlaceholderText } = render(
      <LabeledInput
        label="Label"
        placeholder="money"
        value={""}
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByPlaceholderText("money");
    fireEvent.change(input, { target: { value: "1000" } });

    expect(input).toHaveValue("R$\xa010,00");
  });

  it("should render with type unit", () => {
    const { getByPlaceholderText } = render(
      <LabeledInput
        label="Label"
        type="unit"
        placeholder="unit"
        value={""}
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByPlaceholderText("unit");
    fireEvent.change(input, { target: { value: "1000" } });

    expect(input).toHaveValue("1000 unidades");
  });
});
