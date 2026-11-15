import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Bigfella Auto Express", () => {
  it("navigates through landing page, menu, and operations dashboard", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://bigfella-one.vercel.app" });

    const brandAssert = await testdriver.assert(
      "The Bigfella Auto Express brand and 'Every mile, handled.' headline are visible"
    );
    expect(brandAssert).toBeTruthy();

    await testdriver.find("Menu button in the top navigation bar").click();

    const menuAssert = await testdriver.assert(
      "The flyout menu is open and displays navigation options including Home, Instant quote, and Ops dashboard"
    );
    expect(menuAssert).toBeTruthy();

    await testdriver.find("Ops dashboard link in the menu").click();
    await testdriver.find("Live demo badge or operations desk", { timeout: 15000 });

    const dashboardAssert = await testdriver.assert(
      "The Bigfella Operations dashboard is displayed with the Live demo badge"
    );
    expect(dashboardAssert).toBeTruthy();

    await testdriver.find("Create a quote button on the dashboard").click();
    await testdriver.find("Instant Quote section or form", { timeout: 15000 });

    const quoteAssert = await testdriver.assert(
      "The page displays the Instant Quote section"
    );
    expect(quoteAssert).toBeTruthy();
  });
});
