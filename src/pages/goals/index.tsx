import { useState } from "react";
import { LabeledInput } from "@/components/labeledInput.tsx/index.tsx";
import { Table } from "@/components/table/index.tsx";
import { useProductsAllPeriod } from "@/hooks/useProductsAllPeriod.ts";
import { Loading } from "@/components/loading";

export const Goals = () => {
  const { data: products, isLoading } = useProductsAllPeriod();

  const [dailySalesGoal, setDailySalesGoal] = useState("");
  const [monthlySalesGoal, setMonthlySalesGoal] = useState("");
  const [prodAGoal, setProdAGoal] = useState("");
  const [prodBGoal, setProdBGoal] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!dailySalesGoal || parseFloat(dailySalesGoal) <= 0) {
      newErrors.push("Meta de Vendas Diárias deve ser maior que zero");
    }

    if (!monthlySalesGoal || parseFloat(monthlySalesGoal) <= 0) {
      newErrors.push("Meta de Vendas Mensais deve ser maior que zero");
    }
    if (!prodAGoal || parseFloat(prodAGoal) <= 0) {
      newErrors.push("Meta de Produção (Tipo A) deve ser maior que zero");
    }
    if (!prodBGoal || parseFloat(prodBGoal) <= 0) {
      newErrors.push("Meta de Produção (Tipo B) deve ser maior que zero");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSaveGoals = async () => {
    setSaveSuccess(false);
    setErrors([]);

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setErrors(["Erro ao salvar metas. Por favor, tente novamente."]);
    } finally {
      setIsSaving(false);
    }
  };

  const progressData =
    products?.flatMap((product) => {
      const name = product?.name ?? "Produto";
      const period = product?.period ?? "Período indefinido";
      const goals = product?.goals ?? 0;
      const profit = product?.profit ?? 0;

      const progress = goals > 0 ? profit / goals : 0;

      return {
        label: `${name} - ${period}`,
        goal: `Meta: ${
          typeof goals === "number" ? `R$ ${goals.toFixed(2)}` : goals
        }`,
        progress: Math.min(progress, 1),
      };
    }) ?? [];

  const historyData =
    products?.map((product, index) => {
      const name = product?.name ?? "Produto";
      const period = product?.period ?? "Período indefinido";
      const goals = product?.goals ?? 0;
      const profit = product?.profit ?? 0;

      const goalsRead = goals > 0 && profit >= goals;

      return {
        id: String(index),
        product: name,
        date: period,
        goals: goals,
        status: goalsRead ? "Atingida" : "Não atingida",
      };
    }) ?? [];

  const tableColumns = [
    { accessorKey: "date", header: "Data" },
    { accessorKey: "goals", header: "Meta" },
    { accessorKey: "result", header: "Resultado" },
  ];

  const transformData = (apiData: any) => {
    return apiData.map((item: any) => ({
      date: item.date,
      goals: item.goals,
      result: item.status,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

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

        {errors.length > 0 && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded"
          >
            <h3 className="text-red-800 font-bold text-base mb-2">
              {errors.length === 1
                ? "Há 1 erro no formulário:"
                : `Há ${errors.length} erros no formulário:`}
            </h3>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {saveSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded"
          >
            <p className="text-green-800 font-medium">
              ✓ Metas salvas com sucesso!
            </p>
          </div>
        )}

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

        <button
          onClick={handleSaveGoals}
          disabled={isSaving}
          aria-busy={isSaving}
          className="bg-primary-500 p-3 rounded-lg items-center ml-auto mb-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Salvando..." : "Salvar Metas"}
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
                item.progress * 100,
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
