import { describe, expect, it } from "vitest";
import { SAVE_KEY, initialProgress, readProgress, rewardMonster, saveProgress, takeDamage } from "./progress";

describe("player progress", () => {
  it("clamps incoming damage", () => {
    expect(takeDamage(initialProgress, 30).hp).toBe(70);
    expect(takeDamage(initialProgress, 300).hp).toBe(0);
    expect(takeDamage(initialProgress, -5).hp).toBe(100);
  });

  it("rewards defeats and handles level ups", () => {
    const rewarded = rewardMonster(initialProgress);
    expect(rewarded.gold).toBe(8);
    expect(rewarded.defeated).toBe(1);
    const leveled = rewardMonster({ ...initialProgress, xp: 35 }, 80);
    expect(leveled.level).toBe(3);
    expect(leveled.maxHp).toBe(140);
    expect(leveled.hp).toBe(140);
  });

  it("reads, writes, and rejects invalid saves", () => {
    let saved = "";
    saveProgress({ ...initialProgress, gold: 18 }, { setItem: (key, value) => { saved = key + "|" + value; } });
    expect(saved.startsWith(SAVE_KEY + "|")).toBe(true);
    expect(readProgress({ getItem: () => JSON.stringify({ ...initialProgress, gold: 18 }) }).gold).toBe(18);
    expect(readProgress({ getItem: () => "broken" })).toEqual(initialProgress);
    expect(readProgress({ getItem: () => JSON.stringify({ level: "one" }) })).toEqual(initialProgress);
  });
});
