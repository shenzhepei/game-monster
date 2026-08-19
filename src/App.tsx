import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppHeader } from "./components/AppHeader";
import { HudPanel } from "./components/HudPanel";
import { TouchControls } from "./components/TouchControls";
import { STATS_EVENT } from "./game/events";
import { GameCanvas } from "./game/GameCanvas";
import { readProgress, type PlayerProgress } from "./game/progress";

export default function App() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(readProgress);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const onStats = (event: Event) => setProgress((event as CustomEvent<PlayerProgress>).detail);
    window.addEventListener(STATS_EVENT, onStats);
    return () => window.removeEventListener(STATS_EVENT, onStats);
  }, []);
  const showSaved = () => {
    setToast(t("saved"));
    window.setTimeout(() => setToast(""), 1800);
  };
  return (
    <div className="app-shell">
      <AppHeader />
      <main>
        <div className="page-heading"><div><p>FIELD LOG / 01</p><h1>{t("title")}</h1><span>{t("subtitle")}</span></div></div>
        <div className="game-layout">
          <section className="scene-panel">
            <GameCanvas />
            <TouchControls />
          </section>
          <HudPanel onSaved={showSaved} progress={progress} />
        </div>
      </main>
      {toast && <div className="toast"><Save size={16} />{toast}</div>}
    </div>
  );
}
