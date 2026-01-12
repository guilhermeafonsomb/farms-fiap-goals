import { render } from "@/test/test-utils";
import { Table } from ".";

describe("Table tests", () => {
  it("should render correctly", () => {
    const tableColumns = [
      { accessorKey: "date", header: "Data" },
      { accessorKey: "goals", header: "Meta" },
      { accessorKey: "result", header: "Resultado" },
      { accessorKey: "status", header: "Status" },
    ];

    const tableData = [
      {
        date: "2022-01-01",
        goals: 10,
        result: 10,
        status: "Ativo",
      },
    ];

    const { getByText } = render(
      <Table data={tableData} columns={tableColumns} />
    );

    expect(getByText("Data")).toBeInTheDocument();
    expect(getByText("Meta")).toBeInTheDocument();
    expect(getByText("Resultado")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
  });
});
