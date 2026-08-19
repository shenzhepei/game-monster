import { describe, expect, it } from "vitest";
import { LANGUAGE_KEY, readLanguage, saveLanguage } from "./language";
describe("language preference", () => {
  it("defaults missing and invalid values to English", () => {
    expect(readLanguage({ getItem: () => null })).toBe("en");
    expect(readLanguage({ getItem: () => "de" })).toBe("en");
  });
  it("restores and stores Chinese", () => {
    expect(readLanguage({ getItem: () => "zh-CN" })).toBe("zh-CN");
    let saved = "";
    saveLanguage("zh-CN", { setItem: (key, value) => { saved = key + value; } });
    expect(saved).toBe(LANGUAGE_KEY + "zh-CN");
  });
});
