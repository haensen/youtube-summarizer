import { useContext, useState, useEffect } from "react";
import { ApiSettingsContext } from "./apiSettingsContext";

let lastClipboardUrl = '';

export function useUrl(initialUrl: string, startSummarizing: () => void) {
    const [url, setUrl] = useState<string>(initialUrl);
    const apiSettings = useContext(ApiSettingsContext);

    // Check for clipboard changes every second
    useEffect(() => {
        if (!apiSettings.autoSummarizeClipboardUrl) return;
        
        const interval = setInterval(() => {
            if (apiSettings.autoSummarizeClipboardUrl) {
                navigator.clipboard.readText().then((text) => {
                    // Don't copy same url again
                    if (text !== lastClipboardUrl && (
                            text.startsWith('https://www.youtube.com/watch?v=') ||
                            text.startsWith('https://www.youtube.com/embed/')
                        )
                    ) {
                        setUrl(text);
                        lastClipboardUrl = text;
                        startSummarizing();
                    }
                }).catch((err) => {
                    console.error('Failed to read clipboard contents: ', err);
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [apiSettings.autoSummarizeClipboardUrl]);

    return [url, setUrl] as const;
}
