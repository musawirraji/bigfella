import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Operations Dashboard Access Control", () => {
  it("shows restricted access notice when accessed without credentials", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://bigfella-one.vercel.app/dashboard" });

    const restrictedAssert = await testdriver.assert(
      "The page displays a Restricted access notice stating the dashboard needs an access key"
    );
    expect(restrictedAssert).toBeTruthy();
  });

  it("grants access to operations desk when demo key is provided", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "https://bigfella-one.vercel.app/dashboard?k=ops-7f3a9c2e",
    });

    const opsAssert = await testdriver.assert(
      "The Bigfella Operations Desk is displayed with the Live demo badge"
    );
    expect(opsAssert).toBeTruthy();
  });
});
