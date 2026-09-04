import { useState } from 'preact/hooks';
import { toast } from 'sonner';
import { convId, projectId, sanitize, saveJSON } from '../../utils';
import { Cred } from '../../cred';
import { fetchConversation } from '../../api';
import { CHATGPT_ICON_BUTTON_CLASS } from './chatgptUiClasses';

interface ExportJsonButtonProps {
    refreshCredStatus: () => Promise<void>;
    onDataFetched?: (data: any) => void;
}

export function ExportJsonButton({ refreshCredStatus, onDataFetched }: ExportJsonButtonProps) {
    const [busy, setBusy] = useState(false);

    const handleJsonExport = async () => {
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

            const data = await fetchConversation(id, pid || undefined);
            if (onDataFetched) onDataFetched(data);

            const safeTitle = sanitize(data?.title || '');
            const filename = `${safeTitle || 'chat'}_${id}.json`;
            saveJSON(data, filename);
            toast.success('Export JSON dokončen');
        } catch (e: any) {
            console.error('[ChatGPT-Multimodal-Exporter] Export selhal: ', e);
            toast.error('Export selhal: ' + (e && e.message ? e.message : e));
        } finally {
            setBusy(false);
        }
    };

    return (
        <button
            id="cgptx-mini-btn"
            className={CHATGPT_ICON_BUTTON_CLASS}
            title="Exportovat JSON"
            aria-label="Exportovat JSON"
            onClick={handleJsonExport}
            disabled={busy}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        </button>
    );
}
