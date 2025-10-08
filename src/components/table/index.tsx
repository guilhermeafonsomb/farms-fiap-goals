import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import clsx from "clsx";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const Table = <T,>({ data, columns }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="border border-primary-200 rounded-lg">
      <thead className="rounded-lg border-b border-primary-200 text-left">
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th className="text-black px-2 py-3 " key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-b " key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <td
                className={clsx(
                  "px-2 py-3 text-left",
                  index === 0 ? "text-black" : "text-primary-500"
                )}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
