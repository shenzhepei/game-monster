import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendCommand, type GameCommand } from "../game/events";

const controls = [
  { direction: "up", icon: ArrowUp },
  { direction: "left", icon: ArrowLeft },
  { direction: "down", icon: ArrowDown },
  { direction: "right", icon: ArrowRight },
] as const;

export function TouchControls() {
  const { t } = useTranslation();
  return (
    <div className="touch-controls" role="group" aria-label={t("controls")}>
      {controls.map(({ direction, icon: Icon }) => (
        <button
          className={"touch-" + direction}
          key={direction}
          onPointerDown={() => sendCommand(("move-" + direction) as GameCommand)}
          onPointerLeave={() => sendCommand("stop")}
          onPointerUp={() => sendCommand("stop")}
          title={direction}
          type="button"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}
