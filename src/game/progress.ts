export type PlayerProgress = {
  level: number;
  hp: number;
  maxHp: number;
  xp: number;
  nextXp: number;
  gold: number;
  defeated: number;
};

export const SAVE_KEY = "game-monster-progress";
export const initialProgress: PlayerProgress = { level: 1, hp: 100, maxHp: 100, xp: 0, nextXp: 40, gold: 0, defeated: 0 };

export function takeDamage(progress: PlayerProgress, damage: number): PlayerProgress {
  return { ...progress, hp: Math.max(0, progress.hp - Math.max(0, damage)) };
}

export function rewardMonster(progress: PlayerProgress, reward = 12): PlayerProgress {
  let level = progress.level;
  let xp = progress.xp + reward;
  let nextXp = progress.nextXp;
  let maxHp = progress.maxHp;
  while (xp >= nextXp) {
    xp -= nextXp;
    level += 1;
    nextXp = Math.round(nextXp * 1.35);
    maxHp += 20;
  }
  return {
    ...progress,
    level,
    xp,
    nextXp,
    maxHp,
    hp: level > progress.level ? maxHp : progress.hp,
    gold: progress.gold + 8,
    defeated: progress.defeated + 1,
  };
}

export function readProgress(storage: Pick<Storage, "getItem"> = globalThis.localStorage): PlayerProgress {
  try {
    const value = JSON.parse(storage.getItem(SAVE_KEY) ?? "null") as Partial<PlayerProgress> | null;
    if (!value || typeof value.level !== "number" || typeof value.hp !== "number") return { ...initialProgress };
    return { ...initialProgress, ...value };
  } catch {
    return { ...initialProgress };
  }
}

export function saveProgress(progress: PlayerProgress, storage: Pick<Storage, "setItem"> = globalThis.localStorage) {
  storage.setItem(SAVE_KEY, JSON.stringify(progress));
}
