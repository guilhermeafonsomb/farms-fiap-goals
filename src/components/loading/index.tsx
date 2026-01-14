export const Loading = () => {
  return (
    <section>
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-black mb-3">
          Metas de Vendas e Produção
        </h1>
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary-500/20"></div>
            <p className="text-black text-lg">Carregando metas...</p>
            <span className="sr-only">
              Por favor, aguarde enquanto as metas são carregadas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
