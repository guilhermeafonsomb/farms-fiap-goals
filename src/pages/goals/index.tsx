import { useState } from "react";
import { LabeledInput } from "@/components/labeledInput.tsx/index.tsx";
import { Table } from "@/components/table/index.tsx";
import { useProductsAllPeriod } from "@/hooks/useProductsAllPeriod.ts";

export const Goals = () => {
  const { data: products } = useProductsAllPeriod();

  const [dailySalesGoal, setDailySalesGoal] = useState("");
  const [monthlySalesGoal, setMonthlySalesGoal] = useState("");
  const [prodAGoal, setProdAGoal] = useState("");
  const [prodBGoal, setProdBGoal] = useState("");

  const progressData =
    products?.flatMap((product) => {
      const nome = product?.nome ?? "Produto";
      const periodo = product?.periodo ?? "Período indefinido";
      const meta = product?.meta ?? 0;
      const lucro = product?.lucro ?? 0;

      const progresso = meta > 0 ? lucro / meta : 0;

      return {
        label: `${nome} - ${periodo}`,
        goal: `Meta: ${
          typeof meta === "number" ? `R$ ${meta.toFixed(2)}` : meta
        }`,
        progress: Math.min(progresso, 1),
      };
    }) ?? [];

  const historyData =
    products?.map((produto, index) => {
      const nome = produto?.nome ?? "Produto";
      const periodo = produto?.periodo ?? "Período indefinido";
      const meta = produto?.meta ?? 0;
      const lucro = produto?.lucro ?? 0;

      const atingiuMeta = meta > 0 && lucro >= meta;

      return {
        id: String(index),
        produto: nome,
        date: periodo,
        goal: meta,
        status: atingiuMeta ? "Atingida" : "Não atingida",
      };
    }) ?? [];

  const tableColumns = [
    { accessorKey: "date", header: "Data" },
    { accessorKey: "goals", header: "Meta" },
    { accessorKey: "result", header: "Resultado" },
    { accessorKey: "status", header: "Status" },
  ];

  const transformData = (apiData: any) => {
    return apiData.map((item: any) => ({
      date: item.date,
      goal: item.goal,
      result: item.result,
      status: item.status,
    }));
  };

  return (
    <section>
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-black mb-3">
          Metas de Vendas e Produção
        </h1>
        <p className="text-primary-500 mb-8">
          Defina e acompanhe suas metas para otimizar a produção e impulsionar
          as vendas.
        </p>

        <h2 className="text-black text-lg font-bold mb-5">Definir metas</h2>

        <div className="grid grid-cols-2 gap-4 mb-6 max-w-lg">
          <LabeledInput
            label="Meta de Vendas Diárias"
            type="money"
            value={dailySalesGoal}
            onChangeText={setDailySalesGoal}
          />
          <LabeledInput
            label="Meta de Vendas Mensais"
            type="money"
            value={monthlySalesGoal}
            onChangeText={setMonthlySalesGoal}
          />
          <LabeledInput
            label="Meta de Produção (Tipo A)"
            type="unit"
            value={prodAGoal}
            onChangeText={setProdAGoal}
          />
          <LabeledInput
            label="Meta de Produção (Tipo B)"
            type="unit"
            value={prodBGoal}
            onChangeText={setProdBGoal}
          />
        </div>

        <button className="bg-primary-500 p-3 rounded-lg items-center ml-auto mb-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2">
          Salvar Metas
        </button>

        <h2 className="text-black text-lg font-bold mb-5">
          Progresso das Metas
        </h2>
        {progressData.map((item, index) => (
          <div key={index} className="mb-6">
            <p className="text-base text-black font-medium mb-3">
              {item.label} ({Math.round(item.progress * 100)}%)
            </p>

            <progress
              className="w-56 appearance-none [&::-webkit-progress-bar]:rounded-lg filled:rounded-lg unfilled:bg-slate-300 filled:bg-[#4dde21]"
              value={item.progress}
              aria-label={`Progresso para ${item.label}`}
              aria-valuenow={Math.round(item.progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${Math.round(
                item.progress * 100
              )} porcentagem completa`}
            />
            <p className="text-sm text-primary-500 mt-3">{item.goal}</p>
          </div>
        ))}

        <h2 className="text-lg font-bold mb-5 mt-2">
          Histórico de Metas Atingidas
        </h2>
        {tableColumns && historyData.length > 0 && (
          <Table
            columns={tableColumns}
            data={transformData(historyData ?? [])}
          />
        )}
      </div>
    </section>
  );
};
