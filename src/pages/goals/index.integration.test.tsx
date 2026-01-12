import { render, waitFor } from "@/test/test-utils";
import { Goals } from ".";

describe("Goals Page Integration Tests", () => {
  it("should fetch products from API and display them correctly", async () => {
    const { getByText, container } = render(<Goals />);

    await waitFor(() => {
      expect(getByText("Metas de Vendas e Produção")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(/Produto A - Mensal/i)).toBeInTheDocument();
      expect(getByText(/Produto B - Semanal/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(/Meta: R\$ 1500\.00/i)).toBeInTheDocument();
      expect(getByText(/Meta: R\$ 2500\.00/i)).toBeInTheDocument();
    });

    const progressBars = container.querySelectorAll("progress");
    expect(progressBars).toHaveLength(2);
  });

  it("should handle empty data from API", async () => {
    const { server } = await import("@/lib/mocks/server");
    const { http, HttpResponse } = await import("msw");
    const { APPWRITE_ENDPOINT, DATABASE_ID, COLLECTION_ID } = await import(
      "@/lib/mocks/handlers"
    );

    server.use(
      http.get(
        `${APPWRITE_ENDPOINT}/tablesdb/${DATABASE_ID}/tables/${COLLECTION_ID}/rows`,
        () => {
          return HttpResponse.json({
            total: 0,
            rows: [],
          });
        }
      )
    );

    const { container, getByText } = render(<Goals />);

    await waitFor(() => {
      expect(getByText("Metas de Vendas e Produção")).toBeInTheDocument();
    });

    const table = container.querySelector("table");
    expect(table).not.toBeInTheDocument();

    const progressBars = container.querySelectorAll("progress");
    expect(progressBars).toHaveLength(0);
  });

  it("should calculate progress correctly with real data", async () => {
    const { getByText } = render(<Goals />);

    await waitFor(() => {
      expect(getByText(/Produto A - Mensal \(67%\)/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(/Produto B - Semanal \(80%\)/i)).toBeInTheDocument();
    });
  });

  it("should render table with correct headers", async () => {
    const { getByText, container } = render(<Goals />);

    await waitFor(() => {
      expect(getByText("Histórico de Metas Atingidas")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText("Data")).toBeInTheDocument();
      expect(getByText("Meta")).toBeInTheDocument();
      expect(getByText("Status")).toBeInTheDocument();
    });

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
  });
});
