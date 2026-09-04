import { useEffect, useState } from 'preact/hooks';
import {
  AutoSaveStatus,
  runAutoSave,
  runFullAutoSave,
  startAutoSaveLoop,
  stopAutoSaveLoop,
  pickAndSaveRootHandle,
  getRootHandle,
} from '../../autoSave';
import { Logger } from '../../logger';
import { toast } from 'sonner';
import {
  CHATGPT_MODAL_BOX_CLASS,
  CHATGPT_MODAL_GRID_CLASS,
  CHATGPT_MODAL_OVERLAY_CLASS,
  CHATGPT_PANEL_CLASS,
  CHATGPT_SECONDARY_BUTTON_CLASS,
  CHATGPT_SETTINGS_LEFT_CLOSE_BUTTON_CLASS,
  CHATGPT_SWITCH_CLASS,
  CHATGPT_SWITCH_THUMB_CLASS,
} from './chatgptUiClasses';

interface Props {
  status: AutoSaveStatus;
  onClose: () => void;
}

type SettingsTab = 'general' | 'storage' | 'advanced';

const SETTINGS_ROW_CLASS = 'border-token-border-light flex min-h-15 items-center border-b py-2 last-of-type:border-none';
const SETTINGS_TAB_CLASS = 'group __menu-item hoverable gap-1.5 cgptx-settings-tab';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, ariaLabel, disabled = false }: ToggleSwitchProps) {
  const state = checked ? 'checked' : 'unchecked';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      data-state={state}
      className={CHATGPT_SWITCH_CLASS}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span data-state={state} className={CHATGPT_SWITCH_THUMB_CLASS}></span>
    </button>
  );
}

function statusText(state: AutoSaveStatus['state']) {
  if (state === 'idle') return 'Nečinný';
  if (state === 'checking') return 'Kontrola';
  if (state === 'saving') return 'Ukládání';
  if (state === 'disabled') return 'Vypnuto';
  return 'Chyba';
}

export function AutoSaveSettings({ status, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [debug, setDebug] = useState(Logger.isDebug());
  const [rootPath, setRootPath] = useState<string>('');
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  useEffect(() => {
    getRootHandle().then((h) => {
      const hasSetting = localStorage.getItem('chatgpt_exporter_autosave_enabled') !== null;
      const storedEnabled = localStorage.getItem('chatgpt_exporter_autosave_enabled') === 'true';
      const storedInterval = localStorage.getItem('chatgpt_exporter_autosave_interval');
      const initialInterval = storedInterval ? parseInt(storedInterval, 10) : 5;
      const isEnabledEffectively = !!h && (hasSetting ? storedEnabled : true);

      setIntervalMinutes(initialInterval);
      setEnabled(isEnabledEffectively);
      setRootPath(h ? h.name : 'Nevybráno');
      setLoading(false);
    });
  }, []);

  const applyEnabled = async (nextEnabled: boolean) => {
    if (nextEnabled) {
      let handle = await getRootHandle();
      if (!handle) {
        const picked = await pickAndSaveRootHandle();
        if (!picked) {
          toast.info('Automatické ukládání nebylo zapnuto');
          return;
        }
        handle = picked;
        setRootPath(picked.name);
      }

      localStorage.setItem('chatgpt_exporter_autosave_enabled', 'true');
      setEnabled(true);
      startAutoSaveLoop(intervalMinutes * 60 * 1000);
      toast.success('Automatické ukládání zapnuto');
      return;
    }

    localStorage.setItem('chatgpt_exporter_autosave_enabled', 'false');
    setEnabled(false);
    stopAutoSaveLoop();
    toast.info('Automatické ukládání pozastaveno');
  };

  const handleIntervalChange = (value: string) => {
    const nextInterval = Math.max(1, parseInt(value, 10) || 1);
    setIntervalMinutes(nextInterval);
    localStorage.setItem('chatgpt_exporter_autosave_interval', String(nextInterval));
    if (enabled) {
      startAutoSaveLoop(nextInterval * 60 * 1000);
    }
  };

  const changeFolder = async () => {
    const h = await pickAndSaveRootHandle();
    if (!h) return;

    setRootPath(h.name);
    toast.success('Složka pro ukládání byla změněna');
    if (enabled) {
      startAutoSaveLoop(intervalMinutes * 60 * 1000);
    }
  };

  const renderGeneralTab = () => (
    <section className="relative">
      <div className="flex min-h-15 items-center py-3 border-token-border-default border-b">
        <h3 className="w-full text-lg font-normal">Automatické ukládání</h3>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Stav</div>
            <span className={`cgptx-status-chip ${status.state}`}>{statusText(status.state)}</span>
          </div>
          {status.message && <div className="text-token-text-tertiary my-1 text-xs">{status.message}</div>}
          {status.lastRun > 0 && (
            <div className="text-token-text-tertiary my-1 text-xs">
              Poslední spuštění: {new Date(status.lastRun).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Automatické ukládání</div>
            <div className="flex items-center gap-1">
              <ToggleSwitch
                checked={enabled}
                onChange={applyEnabled}
                ariaLabel="Automatické ukládání"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Interval ukládání (minuty)</div>
            <input
              className="cgptx-settings-number"
              type="number"
              min="1"
              value={intervalMinutes}
              onChange={(e: any) => handleIntervalChange(e.target.value)}
              disabled={!enabled}
            />
          </div>
        </div>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Ruční úlohy</div>
            <div className="cgptx-settings-actions-left">
              <button
                className={CHATGPT_SECONDARY_BUTTON_CLASS}
                onClick={() => { runAutoSave(); toast.info('Okamžité uložení spuštěno'); }}
                disabled={status.state !== 'idle' && status.state !== 'error'}
                title="Spustit běžnou přírůstkovou kontrolu"
              >
                Spustit nyní
              </button>
              <button
                className={CHATGPT_SECONDARY_BUTTON_CLASS}
                onClick={() => { runFullAutoSave(); toast.info('Úplné skenování spuštěno'); }}
                disabled={status.state !== 'idle' && status.state !== 'error'}
                title="Zkontroluje všechny chaty (pomalejší)"
              >
                Úplné skenování
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-token-text-tertiary mt-3 text-xs">
        Změny se projeví automaticky; není třeba potvrzovat nastavení.
      </div>
    </section>
  );

  const renderStorageTab = () => (
    <section className="relative">
      <div className="flex min-h-15 items-center py-3 border-token-border-default border-b">
        <h3 className="w-full text-lg font-normal">Úložiště</h3>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Složka pro ukládání</div>
            <div className="flex items-center gap-2">
              <span className="cgptx-settings-folder" title={rootPath}>{rootPath}</span>
              <button className={CHATGPT_SECONDARY_BUTTON_CLASS} onClick={changeFolder}>Změnit</button>
            </div>
          </div>
          <div className="text-token-text-tertiary my-1 text-xs">
            Doporučujeme samostatnou složku, aby se soubory nemíchaly s ručními exporty.
          </div>
        </div>
      </div>
    </section>
  );

  const renderAdvancedTab = () => (
    <section className="relative">
      <div className="flex min-h-15 items-center py-3 border-token-border-default border-b">
        <h3 className="w-full text-lg font-normal">Pokročilé</h3>
      </div>

      <div className={SETTINGS_ROW_CLASS}>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div>Režim ladění (projeví se okamžitě)</div>
            <div className="flex items-center gap-1">
              <ToggleSwitch
                checked={debug}
                onChange={(next) => {
                  setDebug(next);
                  Logger.setDebug(next);
                }}
                ariaLabel="Režim ladění"
              />
            </div>
          </div>
          <div className="text-token-text-tertiary my-1 text-xs">
            Po zapnutí se budou zapisovat podrobnější protokoly pro diagnostiku automatického ukládání.
          </div>
        </div>
      </div>
    </section>
  );

  if (loading) return null;

  return (
    <div className={CHATGPT_MODAL_OVERLAY_CLASS} onClick={onClose}>
      <div className={CHATGPT_MODAL_GRID_CLASS}>
        <div className={`${CHATGPT_MODAL_BOX_CLASS} cgptx-settings-dialog`} onClick={(e) => e.stopPropagation()}>
          <div className="cgptx-settings-shell">
            <div
              className="bg-token-bg-elevated-secondary flex shrink-0 flex-row select-none [--end:right] [--start:left] max-md:overflow-x-auto max-md:border-b max-md:py-1.5 md:max-w-[210px] md:min-w-[180px] md:flex-col rtl:[--end:left] rtl:[--start:right] dark:bg-black/10 cgptx-settings-tablist"
              role="tablist"
              aria-orientation="vertical"
            >
              <div className="cgptx-settings-tab-close">
                <button
                  type="button"
                  className={CHATGPT_SETTINGS_LEFT_CLOSE_BUTTON_CLASS}
                  aria-label="Zavřít nastavení automatického ukládání"
                  onClick={onClose}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'general'}
                data-state={activeTab === 'general' ? 'active' : 'inactive'}
                className={SETTINGS_TAB_CLASS}
                onClick={() => setActiveTab('general')}
              >
                Obecné
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'storage'}
                data-state={activeTab === 'storage' ? 'active' : 'inactive'}
                className={SETTINGS_TAB_CLASS}
                onClick={() => setActiveTab('storage')}
              >
                Úložiště
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'advanced'}
                data-state={activeTab === 'advanced' ? 'active' : 'inactive'}
                className={SETTINGS_TAB_CLASS}
                onClick={() => setActiveTab('advanced')}
              >
                Pokročilé
              </button>
            </div>

            <div className={`${CHATGPT_PANEL_CLASS} cgptx-settings-panel`} role="tabpanel">
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'storage' && renderStorageTab()}
              {activeTab === 'advanced' && renderAdvancedTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
