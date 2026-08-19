import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { MonsterScene } from "./MonsterScene";

export function GameCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hostRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: hostRef.current,
      width: 900,
      height: 560,
      backgroundColor: "#b8cba5",
      pixelArt: true,
      physics: { default: "arcade", arcade: { debug: false } },
      scene: [MonsterScene],
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    });
    return () => game.destroy(true);
  }, []);
  return <div className="game-canvas" ref={hostRef} />;
}
