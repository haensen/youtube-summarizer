import { Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Settings } from './settings';
import { SummarizerPopup } from './summarizerPopup';
import { ApiSettings, ApiSettingsContext } from './apiSettingsContext';
import { Summary } from './summary';

let initialSummaryText = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
for (let i = 0; i < 10; i++) {
    initialSummaryText = initialSummaryText.concat(initialSummaryText);
}

localStorage['apiSettings'] = localStorage['apiSettings'] || JSON.stringify({
    apiKey: '',
    apiUrl: 'http://127.0.0.1:1234',
    model: '',
    availableModels: [],
});

function App() {
    const [apiSettings, setApiSettings] = useState<ApiSettings>(JSON.parse(localStorage['apiSettings']));
    const [url, setUrl] = useState('');
    const [summary, setSummary] = useState(initialSummaryText);
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    const setApiSettingsPersistently = useMemo(() => {
        return (settings: ApiSettings) => {
            setApiSettings(settings);
            localStorage['apiSettings'] = JSON.stringify(settings);
            console.log("Persisted settings: ", settings);
        };
    }, []);

    return (
        <ApiSettingsContext.Provider value={{...apiSettings, setApiSettings: setApiSettingsPersistently}}>
            <div className="flex flex-col h-screen">
                <div>
                    <IconButton aria-label="settings" onClick={() => setShowSettings(!showSettings)} className="float-right">
                        <SettingsIcon />
                    </IconButton>
                    <Typography variant="h3" className="text-center">Youtube Video Summarizer</Typography>
                    <form>
                        <div className='flex flex-row items-center justify-center gap-2 items-stretch'>
                            <TextField id="outlined-basic" label="Youtube URL" variant="outlined" onChange={(e) => setUrl(e.target.value)} style={{width: "25em"}} className="" />
                            <Button variant="contained" onClick={() => setLoading(true)}>Summarize</Button>
                        </div>
                    </form>
                </div>
                <Paper elevation={4} className="p-4 m-4 grow min-h-0">
                    <Summary summary={summary} />
                </Paper>

                {showSettings && <Settings onClose={() => setShowSettings(false)} />}

                {loading && <SummarizerPopup url={url} onDone={(summary) => {
                    setSummary(summary);
                    setLoading(false);
                }} />}
            </div>
        </ApiSettingsContext.Provider>
    );
}

const root = createRoot(document.body);
root.render(<App />);
