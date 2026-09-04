import { useState } from 'preact/hooks';
import { toast } from 'sonner';
import { convId, projectId } from '../../utils';
import { Cred } from '../../cred';
import { fetchConversation } from '../../api';
import { collectFileCandidates } from '../../files';
import { downloadSelectedFiles } from '../../downloads';
import { showFilePreviewDialog } from '../dialogs/FilePreviewDialog';
import { CHATGPT_ICON_BUTTON_CLASS } from './chatgptUiClasses';

interface DownloadFilesButtonProps {
    refreshCredStatus: () => Promise<void>;
    cachedData: any | null;
    onDataFetched?: (data: any) => void;
}

export function DownloadFilesButton({ refreshCredStatus, cachedData, onDataFetched }: DownloadFilesButtonProps) {
    const [busy, setBusy] = useState(false);


    const handleFilesDownload = async () => {
        const id = convId();
        const pid = projectId();
        if (!id) {
            toast.error('Nebylo zjištěno ID chatu. Funkci použijte v konkrétním chatu (URL musí obsahovat /c/xxxx).');
            return;
        }

        setBusy(true);

        try {
            await refreshCredStatus();
            if (!Cred.token) throw new Error('Není k dispozici platný accessToken');

            let data = cachedData;
            if (!data || data.conversation_id !== id) {
                data = await fetchConversation(id, pid || undefined);
                if (onDataFetched) onDataFetched(data);
            }

            const cands = collectFileCandidates(data);
            if (!cands.length) {
                toast.info('Nebyly nalezeny žádné soubory ani odkazy ke stažení.');
                setBusy(false);
                return;
            }

            showFilePreviewDialog(cands, async (selected) => {
                setBusy(true);

                try {
                    const res = await downloadSelectedFiles(selected);
                    toast.success(`Stahování dokončeno, úspěšně ${res.ok}/${res.total}`);
                } catch (e: any) {
                    console.error('[ChatGPT-Multimodal-Exporter] Stažení selhalo: ', e);
                    toast.error('Stažení selhalo: ' + (e && e.message ? e.message : e));
                } finally {
                    setBusy(false);
                }
            });
            setBusy(false);

        } catch (e: any) {
            console.error('[ChatGPT-Multimodal-Exporter] Stažení selhalo: ', e);
            toast.error('Stažení selhalo: ' + (e && e.message ? e.message : e));
            setBusy(false);
        }
    };

    return (
        <button
            id="cgptx-mini-btn-files"
            className={CHATGPT_ICON_BUTTON_CLASS}
            title={'Stáhnout soubory aktuálního chatu'}
            aria-label="Stáhnout soubory aktuálního chatu"
            onClick={handleFilesDownload}
            disabled={busy}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        </button>
    );
}
