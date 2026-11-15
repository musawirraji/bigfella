import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const baseUrl = process.env.APP_URL || "https://navigate-fragrances-generous-relation.trycloudflare.com";

describe("Page Titles", () => {
  it("verifies home page and styleguide page titles", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: baseUrl });

    const homeTitleAssert = await testdriver.assert(
      "The browser tab title is 'Bigfella Auto Express: instant auto transport quotes' (starts with 'Bigfella Auto Express: inst') and not 'Style Guide'"
    );
    expect(homeTitleAssert).toBeTruthy();

    await testdriver.pressKeys(["ctrl", "l"]);
    await testdriver.type(`${baseUrl.replace(/\/$/, "")}/styleguide`);
    await testdriver.pressKeys(["enter"]);

    const styleguideTitleAssert = await testdriver.assert(
      "The browser tab title is 'Style Guide | Bigfella Auto Express' (starts with 'Style Guide | Bigfella Auto') and the Style Guide header is visible"
    );
    expect(styleguideTitleAssert).toBeTruthy();
  });
});
