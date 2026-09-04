import { useState } from 'preact/hooks';
import { formatBytes } from '../../utils';
import { FileCandidate } from '../../types';
import { toast } from 'sonner';
import { Checkbox } from './Checkbox';
import {
    CHATGPT_MODAL_BOX_CLASS,
    CHATGPT_MODAL_GRID_CLASS,
    CHATGPT_MODAL_HEADER_CLASS,
    CHATGPT_MODAL_OVERLAY_CLASS,
    CHATGPT_MODAL_TITLE_CLASS,
    CHATGPT_PANEL_CLASS,
    CHATGPT_SECONDARY_BUTTON_CLASS,
} from './chatgptUiClasses';

interface FilePreviewDialogProps {
    candidates: FileCandidate[];
    onConfirm: (selected: FileCandidate[]) => void;
    onClose: () => void;
}

export function FilePreviewDialog({ candidates, onConfirm, onClose }: FilePreviewDialogProps) {
    // Default all selected
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
        new Set(candidates.map((_, i) => i))
    );

    const toggleSelect = (idx: number) => {
        const next = new Set(selectedIndices);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setSelectedIndices(next);
    };

    const toggleAll = () => {
        if (selectedIndices.size === candidates.length) {
            setSelectedIndices(new Set());
        } else {
            setSelectedIndices(new Set(candidates.map((_, i) => i)));
        }
    };

    const handleConfirm = () => {
        const selected = candidates.filter((_, i) => selectedIndices.has(i));
        if (selected.length === 0) {
            toast.error('Vyberte alespoň jeden soubor');
            return;
        }
        onConfirm(selected);
        onClose();
    };

    return (
        <div className={CHATGPT_MODAL_OVERLAY_CLASS} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={CHATGPT_MODAL_GRID_CLASS}>
                <div className={CHATGPT_MODAL_BOX_CLASS}>
                    <div className={CHATGPT_MODAL_HEADER_CLASS}>
                        <div className={CHATGPT_MODAL_TITLE_CLASS}>
                            Soubory ke stažení ({candidates.length})
                        </div>
                        <div className="cgptx-modal-actions">
                            <button className={CHATGPT_SECONDARY_BUTTON_CLASS} onClick={toggleAll}>
                                Vybrat vše / obrátit výběr
                            </button>
                            <button className={CHATGPT_SECONDARY_BUTTON_CLASS} onClick={handleConfirm}>
                                Stáhnout vybrané
                            </button>
                            <button className={CHATGPT_SECONDARY_BUTTON_CLASS} onClick={onClose}>
                                Zavřít
                            </button>
                        </div>
                    </div>

                    <div className={`${CHATGPT_PANEL_CLASS} cgptx-modal-panel`}>
                        <div className="cgptx-list">
                            {candidates.map((info, idx) => {
                                const name = (info.meta && (info.meta.name || info.meta.file_name)) || info.file_id || info.pointer || 'Bez názvu';
                                const mime = (info.meta && (info.meta.mime_type || info.meta.file_type)) || (info.meta && info.meta.mime) || '';
                                const size = info.meta?.size_bytes || info.meta?.size || info.meta?.file_size || info.meta?.file_size_bytes || null;

                                const metaParts = [];
                                metaParts.push(`Zdroj: ${info.source || 'Neznámý'}`);
                                if (info.file_id) metaParts.push(`file_id: ${info.file_id}`);
                                if (info.pointer && info.pointer !== info.file_id) metaParts.push(`pointer: ${info.pointer}`);
                                if (mime) metaParts.push(`mime: ${mime}`);
                                if (size) metaParts.push(`Velikost: ${formatBytes(size)}`);

                                return (
                                    <div className="cgptx-item" key={idx}>
                                        <Checkbox
                                            checked={selectedIndices.has(idx)}
                                            onChange={() => toggleSelect(idx)}
                                        />
                                        <div></div>
                                        <div>
                                            <div className="title">{name}</div>
                                            <div className="meta">{metaParts.join(' • ')}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="cgptx-modal-actions cgptx-modal-tip">
                            <div className="cgptx-chip">
                                Po kliknutí na „Stáhnout vybrané“ se soubory stáhnou postupně v pořadí seznamu (včetně /files a CDN odkazů).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
