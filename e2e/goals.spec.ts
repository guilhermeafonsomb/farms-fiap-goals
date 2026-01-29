import { test, expect } from "@playwright/test";

test.describe("Goals Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/tablesdb/**/tables/**/rows", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total: 0,
          rows: [],
        }),
      });
    });

    await page.goto("/goals");
  });

  test("should load the page and show initial elements", async ({ page }) => {
    await expect(
      page.getByText("Metas de Vendas e Produção", { exact: true })
    ).toBeVisible();

    await expect(page.getByText("Meta de Vendas Diárias")).toBeVisible();
    await expect(page.getByText("Meta de Vendas Mensais")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Salvar Metas" })
    ).toBeVisible();

    await expect(page.getByText("Histórico de Metas Atingidas")).toBeVisible();
  });

  test("should allow filling goal inputs and clicking save", async ({
    page,
  }) => {
    const labelText = page.getByText("Meta de Vendas Diárias");
    await expect(labelText).toBeVisible({ timeout: 10000 });

    const dailyInput = page.getByLabel("Meta de Vendas Diárias");

    await dailyInput.fill("1000");

    await expect(dailyInput).toHaveValue(/R\$\s10,00/);

    const saveButton = page.getByRole("button", { name: "Salvar Metas" });
    await saveButton.click();
  });

  test("should display progress bars when data is available", async ({
    page,
  }) => {
    await page.unroute("**/tablesdb/**/tables/**/rows");
    await page.route("**/tablesdb/**/tables/**/rows", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total: 2,
          rows: [
            {
              $id: "1",
              name: "Produto A",
              profit: 1000,
              sales: 50,
              period: "Mensal",
              goals: 1500,
            },
            {
              $id: "2",
              name: "Produto B",
              profit: 2000,
              sales: 100,
              period: "Semanal",
              goals: 2000,
            },
          ],
        }),
      });
    });

    await page.reload();

    await expect(page.getByText(/Produto A - Mensal \(67%\)/)).toBeVisible();

    await expect(page.getByText(/Produto B - Semanal \(100%\)/)).toBeVisible();
  });
});
