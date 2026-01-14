import { render, fireEvent, waitFor } from "@/test/test-utils";
import { Goals } from ".";
import { vi, beforeEach } from "vitest";
import * as useProductsHook from "@/hooks/useProductsAllPeriod";

vi.mock("@/hooks/useProductsAllPeriod");

describe("Goals Page Tests", () => {
  const mockProducts = [
    {
      $id: "1",
      nome: "Tomate",
      lucro: 1500,
      vendas: 50,
      periodo: "Mensal" as const,
      meta: 2000,
    },
    {
      $id: "2",
      nome: "Alface",
      lucro: 3000,
      vendas: 100,
      periodo: "Semanal" as const,
      meta: 2500,
    },
  ];

  beforeEach(() => {
    vi.mocked(useProductsHook.useProductsAllPeriod).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as any);
  });

  it("should render component", () => {
    const { getByText } = render(<Goals />);
    expect(getByText("Metas de Vendas e Produção")).toBeInTheDocument();
  });

  it("should calculate progress correctly", () => {
    const { getByText } = render(<Goals />);
    expect(getByText(/Tomate - Mensal \(75%\)/i)).toBeInTheDocument();
    expect(getByText(/Alface - Semanal \(100%\)/i)).toBeInTheDocument();
  });

  it("should transform API data correctly", () => {
    const { getByText } = render(<Goals />);
    expect(getByText("Atingida")).toBeInTheDocument();
    expect(getByText("Não atingida")).toBeInTheDocument();
  });

  it("should render progress bars for each product", () => {
    const { container } = render(<Goals />);
    const progressBars = container.querySelectorAll("progress");
    expect(progressBars).toHaveLength(2);
  });

  it("should show table only when there is data", () => {
    const { container, rerender } = render(<Goals />);

    let table = container.querySelector("table");
    expect(table).toBeInTheDocument();

    vi.mocked(useProductsHook.useProductsAllPeriod).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    rerender(<Goals />);

    table = container.querySelector("table");
    expect(table).not.toBeInTheDocument();
  });

  it("should update state when typing in inputs", () => {
    const { container } = render(<Goals />);
    const inputs = container.querySelectorAll("input");
    const firstInput = inputs[0] as HTMLInputElement;

    fireEvent.change(firstInput, { target: { value: "1000" } });
    expect(firstInput.value).toBe("R$\xa010,00");
  });

  it("should display form errors messages", () => {
    const { getByText, getByRole, container } = render(<Goals />);
    const inputs = container.querySelectorAll("input");
    const saveButton = getByRole("button", { name: "Salvar Metas" });

    inputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "" } });
    });

    fireEvent.click(saveButton);

    expect(
      getByText("Meta de Vendas Diárias deve ser maior que zero")
    ).toBeInTheDocument();
    expect(
      getByText("Meta de Vendas Mensais deve ser maior que zero")
    ).toBeInTheDocument();
    expect(
      getByText("Meta de Produção (Tipo A) deve ser maior que zero")
    ).toBeInTheDocument();
    expect(
      getByText("Meta de Produção (Tipo B) deve ser maior que zero")
    ).toBeInTheDocument();
  });

  it("should show 'Salvando...' and disable button while saving", async () => {
    const { getByRole, container } = render(<Goals />);
    const inputs = container.querySelectorAll("input");
    const saveButton = getByRole("button", { name: "Salvar Metas" });

    fireEvent.change(inputs[0], { target: { value: "100" } });
    fireEvent.change(inputs[1], { target: { value: "200" } });
    fireEvent.change(inputs[2], { target: { value: "50" } });
    fireEvent.change(inputs[3], { target: { value: "75" } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(getByRole("button", { name: "Salvando..." })).toBeInTheDocument();
      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveAttribute("aria-busy", "true");
    });
  });
});
