import type { PlayerProgress } from "./progress";

export const STATS_EVENT = "monster-field:stats";
export const COMMAND_EVENT = "monster-field:command";
export type GameCommand = "attack" | "save" | "reset" | "move-up" | "move-down" | "move-left" | "move-right" | "stop";

export function emitStats(progress: PlayerProgress) {
  window.dispatchEvent(new CustomEvent<PlayerProgress>(STATS_EVENT, { detail: progress }));
}

export function sendCommand(command: GameCommand) {
  window.dispatchEvent(new CustomEvent<GameCommand>(COMMAND_EVENT, { detail: command }));
}
