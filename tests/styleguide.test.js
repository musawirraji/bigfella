import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Style Guide Specimen", () => {
  it("loads design tokens, typography, and specimen components", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://bigfella-one.vercel.app/styleguide" });

    const specimenAssert = await testdriver.assert(
      "The style guide specimen page is displayed showing Bigfella design tokens or typography"
    );
    expect(specimenAssert).toBeTruthy();
  });
});
