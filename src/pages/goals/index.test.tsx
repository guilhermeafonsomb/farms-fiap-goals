import { render } from "@/test/test-utils";
import { Goals } from ".";

describe("Goals tests", () => {
  it("should render the goals page", () => {
    const { getByText } = render(<Goals />);

    expect(getByText("Metas de Vendas e Produção")).toBeInTheDocument();
  });
});
