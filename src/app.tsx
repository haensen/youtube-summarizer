import { createRoot } from 'react-dom/client';
import { ApiSettings, ApiSettingsContext } from './apiSettingsContext';
import { useStateLocalStorage } from './useStateLocalStorage';
import { MainView } from './mainView';

function App() {
    const [apiSettings, setApiSettings] = useStateLocalStorage<ApiSettings>('apiSettings', {
        apiKey: '',
        apiUrl: 'http://127.0.0.1:1234',
        model: '',
        availableModels: [],
        autoPasteYoutubeUrl: true,
    });

    return (
        <ApiSettingsContext.Provider value={{...apiSettings, setApiSettings}}>
            <MainView />
        </ApiSettingsContext.Provider>
    );
}

const root = createRoot(document.body);
root.render(<App />);
