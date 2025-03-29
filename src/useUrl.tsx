import { useContext, useState, useEffect } from "react";
import { ApiSettingsContext } from "./apiSettingsContext";

let lastClipboardUrl = '';

export function useUrl(initialUrl: string) {
    const [url, setUrl] = useState<string>(initialUrl);
    const apiSettings = useContext(ApiSettingsContext);

    // Check for clipboard changes every second
    useEffect(() => {
        if (!apiSettings.autoPasteYoutubeUrl) return;
        
        const interval = setInterval(() => {
            if (apiSettings.autoPasteYoutubeUrl) {
                navigator.clipboard.readText().then((text) => {
                    // Don't copy same url again
                    if (text !== lastClipboardUrl && text.startsWith('https://www.youtube.com/watch?v=')) {
                        setUrl(text);
                        lastClipboardUrl = text;
                    }
                }).catch((err) => {
                    console.error('Failed to read clipboard contents: ', err);
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [apiSettings.autoPasteYoutubeUrl]);

    return [url, setUrl] as const;
}
