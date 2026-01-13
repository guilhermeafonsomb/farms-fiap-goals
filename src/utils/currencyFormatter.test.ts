import { formatCurrency } from "./currencyFormatter";

describe("currencyFormatter tests", () => {
  test("should format a number as currency", () => {
    const value = 1234.56;

    const formattedValue = formatCurrency(value);

    expect(formattedValue).toBe("R$\xa01.234,56");
  });
});
