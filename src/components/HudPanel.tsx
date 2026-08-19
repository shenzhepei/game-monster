import { Coins, Crosshair, Heart, Save, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendCommand } from "../game/events";
import type { PlayerProgress } from "../game/progress";

export function HudPanel({ progress, onSaved }: { progress: PlayerProgress; onSaved: () => void }) {
  const { t } = useTranslation();
  const save = () => { sendCommand("save"); onSaved(); };
  const reset = () => { if (window.confirm(t("resetConfirm"))) sendCommand("reset"); };
  return (
    <aside className="hud-panel">
      <div className="player-heading">
        <div className="avatar"><Sparkles size={22} /></div>
        <div><span>{t("status")}</span><strong>{t("level")} {progress.level}</strong></div>
      </div>
      <div className="meter">
        <div><span><Heart size={14} />{t("health")}</span><b>{progress.hp} / {progress.maxHp}</b></div>
        <i><em style={{ width: progress.hp / progress.maxHp * 100 + "%" }} /></i>
      </div>
      <div className="meter xp">
        <div><span><Sparkles size={14} />{t("experience")}</span><b>{progress.xp} / {progress.nextXp}</b></div>
        <i><em style={{ width: progress.xp / progress.nextXp * 100 + "%" }} /></i>
      </div>
      <div className="stat-grid">
        <div><Coins size={17} /><span>{t("gold")}</span><strong>{progress.gold}</strong></div>
        <div><Crosshair size={17} /><span>{t("defeated")}</span><strong>{progress.defeated}</strong></div>
      </div>
      <div className="field-notes"><span>{t("objective")}</span><p>{t("objectiveText")}</p></div>
      <div className="hud-actions">
        <button className="attack-button" onClick={() => sendCommand("attack")} type="button"><Crosshair size={18} />{t("attack")}<kbd>{t("attackHint")}</kbd></button>
        <button onClick={save} type="button"><Save size={17} />{t("save")}</button>
        <button className="text-button" onClick={reset} type="button">{t("reset")}</button>
      </div>
    </aside>
  );
}
