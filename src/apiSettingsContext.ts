import { createContext } from "react";

export interface ApiSettings {
    apiKey: string;
    apiUrl: string;
    model: string;
    availableModels: string[];
    autoSummarizeClipboardUrl: boolean;
};

export interface ApiSettingsContextType extends ApiSettings {
    setApiSettings: (settings: ApiSettings) => void;
};

export const ApiSettingsContext = createContext<ApiSettingsContextType>(null);
